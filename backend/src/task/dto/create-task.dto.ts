import { IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  status: 'new' | 'in_progress' | 'completed' | 'overdue';

  @IsNotEmpty()
  @IsString()
  priority: 'low' | 'medium' | 'high';

  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @IsNotEmpty()
  assignedTo: Types.ObjectId;

  @IsNotEmpty()
  projectId: Types.ObjectId;
}