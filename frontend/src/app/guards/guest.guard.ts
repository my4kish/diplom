// src/app/guards/guest.guard.ts
import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  // если не авторизован — доступ разрешён
  if (!auth.isAuth) {
    return true;
  }
  console.log('b')
  // иначе — перенаправляем на главную
  return router.createUrlTree(['/']);
};
