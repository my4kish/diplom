import { IsEnum, IsOptional, IsString, IsUUID, IsArray, IsDateString } from 'class-validator';
import { Priority, TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsEnum(Priority)
  priority: Priority;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imgUrls?: string[];

  assignedToId: string;

  @IsUUID()
  projectId: string;
}
