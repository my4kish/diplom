import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { RoleType } from '../interfaces/models/user.model';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const allowed = route.data['roles'] as RoleType[];

  return userService.currentUser$.pipe(
    map(user => {
      if (user && allowed.includes(user.role as RoleType)) {
        return true;
      }
      // неавторизованный или нет нужной роли — на главную
      return router.parseUrl('/');
    })
  );
};
