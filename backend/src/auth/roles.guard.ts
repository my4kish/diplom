import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(ctx: ExecutionContext): boolean {
    const required = this.reflector.get<RoleType[]>(ROLES_KEY, ctx.getHandler());
    if (!required?.length) return true;
    const user = ctx.switchToHttp().getRequest().user;
    if (!required.includes(user.role)) {
      throw new ForbiddenException(`Для этой операции нужна роль: ${required}`);
    }
    return true;
  }
}