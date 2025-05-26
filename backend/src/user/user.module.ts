import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { FileService } from 'src/file.service';
import { ConfigService } from '@nestjs/config';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [NotificationModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, FileService, ConfigService],
})
export class UserModule {}
