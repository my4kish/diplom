// src/app/layout/header/header.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/models/user.model';
import { RoleType } from '../../interfaces/models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MenuModule,
    BadgeModule,
    AvatarModule,
    ButtonModule,
    OverlayBadgeModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private notificationService = inject(NotificationService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  public router = inject(Router);

  /** Текущий пользователь */
  public user$: Observable<User | null> = this.userService.currentUser$;

  /** Количество непрочитанных уведомлений */
  public unreadCount$: Observable<number> =
    this.notificationService.notifications$.pipe(
      map((list) => list.filter((n) => !n.isRead).length)
    );

  /** Пункты меню */
  public profileItems: MenuItem[] = [];

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe();
    this.notificationService.loadMyNotifications();

    this.profileItems = [
      {
        label: 'Басты бет',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/main']),
      },
      {
        label: 'Жобалар',
        icon: 'pi pi-folder',
        command: () => this.router.navigate(['/projects']),
      },
      {
        label: 'Профиль',
        icon: 'pi pi-user',
        command: () => this.router.navigate(['/profile']),
      },
      { label: 'Шығу', icon: 'pi pi-sign-out', command: () => this.logout() },
    ];
  }

  openNotifications(): void {
    this.notificationService.toggleSidebar();
  }

  toggleDarkMode(): void {
    const el = document.documentElement;
    const isDark = el.classList.toggle('my-app-dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  logout(): void {
    this.authService.logout();
  }
}
