import { IsOptional, IsString, IsArray, IsDate } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsString()
  status?: 'active' | 'completed' | 'archived';

  @IsOptional()
  @IsArray()
  tasks?: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  team?: Types.ObjectId[];

  @IsOptional()
  createdBy?: Types.ObjectId;
}