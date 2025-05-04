import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NotificationService } from 'src/notification/notification.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      imgUrls,
      assignedToId,
      projectId,
    } = createTaskDto;

    const task = await this.prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        dueDate,
        imgUrls,
        assignedTo: {
          connect: { id: assignedToId },
        },
        project: {
          connect: { id: projectId },
        },
      },
    });

    await this.notificationService.notifyUser(
      assignedToId,
      'task',
      `Вам назначена новая задача: ${title}`
    );

    return task;
  }

  findAll() {
    return this.prisma.task.findMany({
      include: {
        assignedTo: true,
        project: true,
        comments: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        assignedTo: true,
        project: true,
        comments: true,
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.task.findMany({
      where: {
        assignedToId: userId,
      },
      include: {
        project: true,
      },
    });
  }

  async findByProject(projectId: string) {
    return this.prisma.task.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        assignedTo: true,
      },
    });
  }

  async findByUserAndProject(userId: string, projectId: string) {
    return this.prisma.task.findMany({
      where: {
        assignedToId: userId,
        projectId: projectId,
      },
      include: {
        project: true,
      },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const existingTask = await this.prisma.task.findUnique({
      where: { id },
      select: { title: true, assignedToId: true },
    });

    if (!existingTask) throw new NotFoundException('Task not found');

    const {
      title,
      description,
      status,
      priority,
      dueDate,
      imgUrls,
      assignedToId,
      projectId,
    } = updateTaskDto;

    const task = await this.prisma.task.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
        ...(priority && { priority }),
        ...(dueDate && { dueDate }),
        ...(imgUrls && { imgUrls }),
        ...(assignedToId && {
          assignedTo: {
            connect: { id: assignedToId },
          },
        }),
        ...(projectId && {
          project: {
            connect: { id: projectId },
          },
        }),
      },
    });

    // Уведомление, если исполнитель был изменён
    if (assignedToId && assignedToId !== existingTask.assignedToId) {
      await this.notificationService.notifyUser(
        assignedToId,
        'task',
        `Вам была переназначена задача: ${existingTask.title}`
      );
    }

    return task;
  }

  async remove(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      select: {
        assignedToId: true,
        title: true,
      },
    });

    if (!task) throw new NotFoundException('Task not found');

    await this.notificationService.notifyUser(
      task.assignedToId,
      'task',
      `Задача "${task.title}" была удалена`
    );

    return this.prisma.task.delete({ where: { id } });
  }
}
