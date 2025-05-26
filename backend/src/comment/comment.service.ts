// src/comments/comment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService, // ← inject Notifications
  ) {}

  /**
   * Создаёт комментарий и сразу уведомляет назначенного по задаче пользователя.
   */
  async create(createCommentDto: CreateCommentDto, authorId: string) {
    // создаём комментарий и сразу подтягиваем к нему автора и данные задачи
    const comment = await this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        task: { connect: { id: createCommentDto.taskId } },
        author: { connect: { id: authorId } },
      },
      include: {
        author: true,
        task: {
          select: {
            id: true,
            title: true,
            assignedToId: true,
          },
        },
      },
    });

    // если у задачи есть исполнитель — уведомляем его
    if (comment.task.assignedToId) {
      await this.notificationService.notifyUser(
        comment.task.assignedToId,
        'comment',
        `Новый комментарий к задаче "${comment.task.title}" от ${comment.author.firstName} ${comment.author.lastName}`,
      );
    }

    return comment;
  }

  async findAll() {
    return this.prisma.comment.findMany({
      include: { author: true, task: true },
    });
  }

  async findOne(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async update(id: string, dto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.comment.delete({ where: { id } });
  }

  async findByTask(taskId: string) {
    return this.prisma.comment.findMany({
      where: { taskId },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
            role: true,
            position: true,
          },
        },
      },
    });
  }
}
