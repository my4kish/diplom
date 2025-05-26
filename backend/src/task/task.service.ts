// src/tasks/task.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NotificationService } from 'src/notification/notification.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FileService } from 'src/file.service';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
    private fileService: FileService,
  ) {}

  /**
   * Создаёт задачу, загружает файлы, уведомляет исполнителя
   */
  async create(createTaskDto: CreateTaskDto, files: Express.Multer.File[]) {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
      assignedToId,
    } = createTaskDto;

    // 1. Проверка существования проекта
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { members: true },
    });
    if (!project) throw new NotFoundException('Project not found');

    // 2. Загружаем изображения (если есть)
    const imgUrls: string[] = [];
    if (files?.length) {
      for (const file of files) {
        const key = `${Date.now()}-${Math.random()}-${file.originalname}`;
        await this.fileService.upload(key, file.buffer);
        imgUrls.push(
          `https://arlan-diplom-bucket.s3.eu-north-1.amazonaws.com/${key}`,
        );
      }
    }

    // 3. Если пользователь указан и не является участником — добавить
    if (assignedToId && !project.members.some((m) => m.id === assignedToId)) {
      await this.prisma.project.update({
        where: { id: projectId },
        data: {
          members: {
            connect: { id: assignedToId },
          },
        },
      });

      // Уведомить, что добавлен в проект
      await this.notificationService.notifyUser(
        assignedToId,
        'project',
        `Вы добавлены в проект "${project.name}" как исполнитель задачи`,
      );
    }

    // 4. Создание задачи
    const task = await this.prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        dueDate,
        imgUrls,
        assignedTo: assignedToId
          ? { connect: { id: assignedToId } }
          : undefined,
        project: { connect: { id: projectId } },
      },
    });

    // 5. Уведомление об обязанности
    if (assignedToId) {
      await this.notificationService.notifyUser(
        assignedToId,
        'task',
        `Вам назначена новая задача: "${task.title}"`,
      );
    }

    return task;
  }

  findAll() {
    return this.prisma.task.findMany({
      include: { assignedTo: true, project: true, comments: true },
    });
  }

  findOne(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
      include: { assignedTo: true, project: true, comments: true },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.task.findMany({
      where: { assignedToId: userId },
      include: { project: true },
    });
  }

  async findByProject(projectId: string) {
    return this.prisma.task.findMany({
      where: { projectId },
      include: { assignedTo: true, comments: true },
    });
  }

  async findByUserAndProject(userId: string, projectId: string) {
    return this.prisma.task.findMany({
      where: { assignedToId: userId, projectId },
      include: { project: true },
    });
  }

  /**
   * Обновляет задачу. Если исполнитель изменён — уведомляет нового.
   */
  async update(id: string, dto: UpdateTaskDto) {
    const existing = await this.prisma.task.findUnique({
      where: { id },
      select: { title: true, assignedToId: true },
    });
    if (!existing) throw new NotFoundException('Task not found');

    const task = await this.prisma.task.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.description && { description: dto.description }),
        ...(dto.status && { status: dto.status }),
        ...(dto.priority && { priority: dto.priority }),
        ...(dto.dueDate && { dueDate: dto.dueDate }),
        ...(dto.imgUrls && { imgUrls: dto.imgUrls }),
        ...(dto.assignedToId && {
          assignedTo: { connect: { id: dto.assignedToId } },
        }),
        ...(dto.projectId && {
          project: { connect: { id: dto.projectId } },
        }),
      },
    });

    // Если исполнитель сменился — уведомляем нового
    if (dto.assignedToId && dto.assignedToId !== existing.assignedToId) {
      await this.notificationService.notifyUser(
        dto.assignedToId,
        'task',
        `Вам была переназначена задача: "${existing.title}"`,
      );
    }

    return task;
  }

  /**
   * Удаляет задачу и уведомляет исполнителя
   */
  async remove(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      select: { assignedToId: true, title: true },
    });
    if (!task) throw new NotFoundException('Task not found');

    // Уведомляем об удалении
    await this.notificationService.notifyUser(
      task.assignedToId,
      'task',
      `Задача "${task.title}" была удалена`,
    );

    return this.prisma.task.delete({ where: { id } });
  }
}
