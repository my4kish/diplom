// src/users/user.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileService } from '../file.service';
import { RoleType } from '@prisma/client';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
    private readonly notificationService: NotificationService,
  ) {}

  /**
   * Создаёт нового пользователя и уведомляет супер-админов
   */
  async create(createUserDto: CreateUserDto) {
    // создаём пользователя
    const newUser = await this.prisma.user.create({
      data: createUserDto,
    });

    // уведомляем всех superadmin-ов о новой регистрации
    const superAdmins = await this.prisma.user.findMany({
      where: { role: RoleType.superadmin },
      select: { id: true },
    });
    for (const admin of superAdmins) {
      await this.notificationService.notifyUser(
        admin.id,
        'user',
        `Новый пользователь зарегистрирован: ${newUser.firstName} ${newUser.lastName}`,
      );
    }

    return newUser;
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        projects: true,
        tasks: true,
        notifications: true,
        comments: true,
        Project: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        projects: true,
        tasks: true,
        notifications: true,
        comments: true,
        Project: true,
      },
    });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateData(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.getCurrentUser(id);

    if (updateUserDto.email) {
      const userByEmail = await this.findOneByEmail(updateUserDto.email);
      if (userByEmail && userByEmail.id !== user.id) {
        throw new ConflictException('User with this email already exists');
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    file: Express.Multer.File,
  ) {
    const user = await this.getCurrentUser(id);

    if (updateUserDto.email) {
      const userByEmail = await this.findOneByEmail(updateUserDto.email);
      if (userByEmail.id !== user.id) {
        throw new ConflictException('User with this email already exists');
      }
    }

    let avatarKey = user.avatarUrl;
    if (file) {
      if (user.avatarUrl) {
        const prevKey = user.avatarUrl.split('/').pop();
        await this.fileService.delete(prevKey);
      }
      avatarKey = `${Date.now()}-${file.originalname}`;
      await this.fileService.upload(avatarKey, file.buffer);
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        avatarUrl: `https://arlan-diplom-bucket.s3.eu-north-1.amazonaws.com/${avatarKey}`,
      },
    });

    return updated;
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async getCurrentUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
