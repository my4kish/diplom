import { IsNotEmpty, IsOptional, IsString, IsArray, IsDate } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsNotEmpty()
  @IsString()
  status: 'active' | 'completed' | 'archived';

  @IsOptional()
  @IsArray()
  tasks?: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  team?: Types.ObjectId[];

  @IsNotEmpty()
  createdBy: Types.ObjectId;
}