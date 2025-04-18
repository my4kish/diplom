import { RoleType } from '@prisma/client';

export class CreateUserDto {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role?: RoleType;
  position?: string;
  avatarUrl?: string;
}
