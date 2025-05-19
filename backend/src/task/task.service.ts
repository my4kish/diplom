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

  async create(
    createTaskDto: CreateTaskDto,
    files: Express.Multer.File[],
    userId: string,
  ) {
    const { title, description, status, priority, dueDate, projectId } =
      createTaskDto;

    // Проверяем, существует ли проект
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const imgUrls: string[] = [];

    // Загружаем изображения и собираем URL
    if (files && files.length > 0) {
      for (const file of files) {
        const uniqueImageKey = `${Date.now()}-${Math.random()}-${file.originalname}`;
        await this.fileService.upload(uniqueImageKey, file.buffer);
        imgUrls.push(
          `https://arlan-diplom-bucket.s3.eu-north-1.amazonaws.com/${uniqueImageKey}`,
        );
      }
    }

    // Создаём задачу с привязкой к проекту и пользователю
    const task = await this.prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        dueDate,
        imgUrls,
        assignedTo: {
          connect: { id: userId }, // связь с пользователем (исполнитель)
        },
        project: {
          connect: { id: projectId }, // связь с проектом
        },
      },
    });

    return task;
    return userId
  }

  // async create(createTaskDto: CreateTaskDto) {
  //   const {
  //     title,
  //     description,
  //     status,
  //     priority,
  //     dueDate,
  //     imgUrls,
  //     assignedToId,
  //     projectId,
  //   } = createTaskDto;

  //   const task = await this.prisma.task.create({
  //     data: {
  //       title,
  //       description,
  //       status,
  //       priority,
  //       dueDate,
  //       imgUrls,
  //       assignedTo: {
  //         connect: { id: assignedToId },
  //       },
  //       project: {
  //         connect: { id: projectId },
  //       },
  //     },
  //   });

  //   await this.notificationService.notifyUser(
  //     assignedToId,
  //     'task',
  //     `Вам назначена новая задача: ${title}`
  //   );

  //   return task;
  // }

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
        `Вам была переназначена задача: ${existingTask.title}`,
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
      `Задача "${task.title}" была удалена`,
    );

    return this.prisma.task.delete({ where: { id } });
  }
}
