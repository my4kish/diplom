import { IsEmail, IsString, IsOptional, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  role?: 'manager' | 'employee' | 'admin';

  @IsOptional()
  @IsArray()
  projects?: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  tasks?: Types.ObjectId[];
}