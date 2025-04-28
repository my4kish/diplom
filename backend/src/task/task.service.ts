import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
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
  
    return this.prisma.task.create({
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
  

  update(id: string, updateTaskDto: UpdateTaskDto) {
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
  
    return this.prisma.task.update({
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
  }
  

  remove(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}
