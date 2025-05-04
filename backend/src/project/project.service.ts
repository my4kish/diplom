import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from '@prisma/client'; // Пример для enum, если ProjectStatus используется в Prisma

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  // Создание нового проекта
  async createProject(createProjectDto: CreateProjectDto, userId: string) {
    const { name, description, memberIds } = createProjectDto;

    const data: any = {
      name,
      description,
      status: ProjectStatus.active,
      createdById: userId,
    };

    if (memberIds?.length) {
      data.members = {
        connect: memberIds.map((id) => ({ id })),
      };
    }

    return this.prisma.project.create({ data });
  }

  // Получение проекта по ID
  async getProjectById(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        members: true,
        tasks: true,
        createdBy: true,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  // Получение всех проектов
  async getAllProjects() {
    return this.prisma.project.findMany({
      include: {
        members: true,
        tasks: true,
        createdBy: true,
      },
    });
  }

  // Обновление данных проекта
  async updateProject(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
    userId: string,
  ) {
    const existingProject = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existingProject) {
      throw new NotFoundException('Project not found');
    }

    // Проверяем, является ли пользователь создателем проекта
    if (existingProject.createdById !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this project',
      );
    }

    // Данные для обновления
    const projectData: any = {
      ...updateProjectDto,
    };

    // Если передан массив membersIds, обновляем участников
    if (updateProjectDto.memberIds) {
      projectData.members = {
        connect: updateProjectDto.memberIds.map((id) => ({ id })),
      };
    }

    // Обновляем проект
    const updatedProject = await this.prisma.project.update({
      where: { id: projectId },
      data: projectData,
    });

    return updatedProject;
  }

  // Удаление проекта
  async deleteProject(projectId: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // Проверяем, является ли пользователь создателем проекта
    if (project.createdById !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this project',
      );
    }

    // Удаляем проект
    await this.prisma.project.delete({
      where: { id: projectId },
    });

    return { message: 'Project successfully deleted' };
  }

  // Добавление участников в проект
  async addMembersToProject(projectId: string, membersIds: string[]) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { members: true },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // ID уже добавленных участников
    const existingMemberIds = project.members.map((m) => m.id);

    // Фильтрация: только те ID, которых ещё нет
    const newMemberIds = membersIds.filter(
      (id) => !existingMemberIds.includes(id),
    );

    if (newMemberIds.length === 0) {
      throw new BadRequestException(
        'All users are already members of this project',
      );
    }

    // Проверка, существуют ли эти пользователи
    const validUsers = await this.prisma.user.findMany({
      where: { id: { in: newMemberIds } },
    });

    if (validUsers.length !== newMemberIds.length) {
      throw new BadRequestException('One or more users not found');
    }

    // Добавление новых участников
    return this.prisma.project.update({
      where: { id: projectId },
      data: {
        members: {
          connect: newMemberIds.map((id) => ({ id })),
        },
      },
      include: {
        members: true,
      },
    });
  }

  // Удаление участников из проекта
  async removeMembersFromProject(projectId: string, membersIds: string[]) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // Отключаем участников
    const updatedProject = await this.prisma.project.update({
      where: { id: projectId },
      data: {
        members: {
          disconnect: membersIds.map((id) => ({ id })),
        },
      },
    });

    return updatedProject;
  }
}
