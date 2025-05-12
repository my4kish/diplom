import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const publicRoutes = [
      { method: 'POST', path: '/auth/register' },
      { method: 'POST', path: '/auth/login' },
    ];

    const { method, url } = request;

    // Если маршрут публичный — пропускаем
    const isPublic = publicRoutes.some(
      route => route.method === method && url.startsWith(route.path),
    );

    if (isPublic) {
      return true;
    }

    // иначе — проверяем токен
    return super.canActivate(context);
  }
}
