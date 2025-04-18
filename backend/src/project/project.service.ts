import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from '@prisma/client'; // Пример для enum, если ProjectStatus используется в Prisma

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  // Создание нового проекта
  async createProject(createProjectDto: CreateProjectDto, userId: string) {
    const { name, description } = createProjectDto;

    // Создание проекта
    const project = await this.prisma.project.create({
      data: {
        name,
        description,
        status: ProjectStatus.active,  // по умолчанию активный
        createdById: userId,
      },
    });

    return project;
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
      throw new ForbiddenException('You are not allowed to update this project');
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
      throw new ForbiddenException('You are not allowed to delete this project');
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
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // Подключаем участников
    const updatedProject = await this.prisma.project.update({
      where: { id: projectId },
      data: {
        members: {
          connect: membersIds.map((id) => ({ id })),
        },
      },
    });

    return updatedProject;
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
