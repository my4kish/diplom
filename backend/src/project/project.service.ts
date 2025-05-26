// src/projects/project.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from '@prisma/client';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}

  /** Создание нового проекта и уведомление участников */
  async createProject(createProjectDto: CreateProjectDto, userId: string) {
    const { name, description, memberIds = [] } = createProjectDto;

    // Создаём уникальный список участников + создатель
    const uniqueMemberIds = Array.from(new Set([...memberIds, userId]));

    const data: any = {
      name,
      description,
      status: ProjectStatus.active,
      createdById: userId,
      members: {
        connect: uniqueMemberIds.map((id) => ({ id })),
      },
    };

    const project = await this.prisma.project.create({
      data,
      include: { members: true },
    });

    // Уведомляем всех участников
    for (const m of project.members) {
      await this.notificationService.notifyUser(
        m.id,
        'project',
        `Вас добавили в проект "${project.name}"`,
      );
    }

    return project;
  }

  async getUserProjects(userId: string) {
    return this.prisma.project.findMany({
      where: {
        OR: [{ createdById: userId }, { members: { some: { id: userId } } }],
      },
      include: {
        members: true,
        tasks: true,
        createdBy: true,
      },
    });
  }

  /** Получение проекта по ID */
  async getProjectById(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { members: true, tasks: true, createdBy: true },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  /** Получение всех проектов */
  async getAllProjects() {
    return this.prisma.project.findMany({
      include: { members: true, tasks: true, createdBy: true },
    });
  }

  /** Обновление данных проекта + уведомление участников */
  async updateProject(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
    userId: string,
  ) {
    const existing = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!existing) throw new NotFoundException('Project not found');
    if (existing.createdById !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this project',
      );
    }

    const projectData: any = { ...updateProjectDto };
    if (updateProjectDto.memberIds) {
      projectData.members = {
        connect: updateProjectDto.memberIds.map((id) => ({ id })),
      };
    }

    const updated = await this.prisma.project.update({
      where: { id: projectId },
      data: projectData,
      include: { members: true },
    });

    // Уведомляем всех участников, что проект изменён
    for (const m of updated.members) {
      await this.notificationService.notifyUser(
        m.id,
        'project',
        `Проект "${updated.name}" был обновлён`,
      );
    }

    return updated;
  }

  /** Удаление проекта */
  async deleteProject(projectId: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { members: true },
    });
    if (!project) throw new NotFoundException('Project not found');
    if (project.createdById !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this project',
      );
    }

    // Уведомляем участников о том, что проект удалён
    for (const m of project.members) {
      await this.notificationService.notifyUser(
        m.id,
        'project',
        `Проект "${project.name}" был удалён`,
      );
    }

    await this.prisma.project.delete({ where: { id: projectId } });
    return { message: 'Project successfully deleted' };
  }

  /** Добавление участников в проект + уведомление новых */
  async addMembersToProject(projectId: string, memberIds: string[]) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { members: true },
    });
    if (!project) throw new NotFoundException('Project not found');

    const existingIds = project.members.map((m) => m.id);
    const newIds = memberIds.filter((id) => !existingIds.includes(id));
    if (!newIds.length) {
      throw new BadRequestException(
        'All users are already members of this project',
      );
    }

    // Проверка существования
    const validUsers = await this.prisma.user.findMany({
      where: { id: { in: newIds } },
    });
    if (validUsers.length !== newIds.length) {
      throw new BadRequestException('One or more users not found');
    }

    const updated = await this.prisma.project.update({
      where: { id: projectId },
      data: { members: { connect: newIds.map((id) => ({ id })) } },
      include: { members: true },
    });

    // Уведомляем только новых участников
    for (const id of newIds) {
      await this.notificationService.notifyUser(
        id,
        'project',
        `Вас добавили в проект "${project.name}"`,
      );
    }

    return updated;
  }

  /** Удаление участников из проекта + уведомление удалённых */
  async removeMembersFromProject(projectId: string, memberIds: string[]) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) throw new NotFoundException('Project not found');

    // Отключаем участников
    const updated = await this.prisma.project.update({
      where: { id: projectId },
      data: { members: { disconnect: memberIds.map((id) => ({ id })) } },
      include: { members: true },
    });

    // Уведомляем удалённых участников
    for (const id of memberIds) {
      await this.notificationService.notifyUser(
        id,
        'project',
        `Вас удалили из проекта "${project.name}"`,
      );
    }

    return updated;
  }
}
