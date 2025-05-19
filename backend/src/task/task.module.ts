import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from 'src/prisma.service';
import { NotificationModule } from 'src/notification/notification.module';
import { FileService } from 'src/file.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [NotificationModule],
  controllers: [TaskController],
  providers: [TaskService, PrismaService, FileService, ConfigService],
})
export class TaskModule {}
