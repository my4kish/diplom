import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { RoleType } from '@prisma/client';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastName?: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  role?: RoleType;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @Matches(/^\+7\(\d{3}\)\d{3}-\d{4}$/, {
    message: 'Phone must be in format +7(XXX) XXX-XXXX',
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  aboutMe?: string;

  @IsOptional()
  @IsString()
  city?: string;
}
