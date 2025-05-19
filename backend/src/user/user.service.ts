import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileService } from 'src/file.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
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

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    file: Express.Multer.File,
  ) {
    const user = await this.getCurrentUser(id);

    if (updateUserDto.email) {
      const userByEmail = await this.findOneByEmail(updateUserDto.email);

      if (userByEmail) {
        throw new ConflictException('User with this email is already exists');
      }
    }

    let uniqueAvatarKey: string = user.avatarUrl;

    if (file) {
      uniqueAvatarKey = `${Math.random()}-${file.originalname}`;

      await this.fileService.upload(uniqueAvatarKey, file.buffer);

      if(user.avatarUrl) {
        await this.fileService.delete(user.avatarUrl)
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        avatarUrl: `https://arlan-diplom-bucket.s3.eu-north-1.amazonaws.com/${uniqueAvatarKey}`,
      },
    });

    return updatedUser;
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
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
