import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles) {
      return true; // нет ограничения
    }

    const { user } = context.switchToHttp().getRequest();
    const userRole = user?.role;

    if (!userRole) {
      throw new ForbiddenException('Роль не указана');
    }

    if (!requiredRoles.includes(userRole)) {
      throw new ForbiddenException('Недостаточно прав');
    }

    return true;
  }
}
