import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private gateway: NotificationsGateway,
  ) {}

  async findAll(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (!notification) throw new NotFoundException('Notification not found');

    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async create(dto: CreateNotificationDto) {
    const notif = await this.prisma.notification.create({ data: dto });
    // сразу пушим по WS
    this.gateway.sendNotification(notif.userId, notif);
    return notif;
  }

  async delete(id: string) {
    return this.prisma.notification.delete({ where: { id } });
  }

  async notifyUser(userId: string, contentType: string, message: string) {
    const notif = await this.prisma.notification.create({
      data: { userId, contentType, message },
    });
    this.gateway.sendNotification(userId, notif);
    return notif;
  }
}
