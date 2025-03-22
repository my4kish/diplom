import { IsEmail, IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  role: 'manager' | 'employee' | 'admin';

  @IsOptional()
  @IsArray()
  projects?: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  tasks?: Types.ObjectId[];
}