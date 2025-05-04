import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { NotificationService } from '../../services/notifiaction.service';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    Menu,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    CommonModule,
    ButtonModule,
    OverlayBadgeModule,
    DrawerModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private readonly notificationService = inject(NotificationService);
  public readonly router = inject(Router);
  profileItems: MenuItem[] | undefined;

  ngOnInit() {
    this.profileItems = [
      {
        label: 'Басты бет',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/main']),
      },
      {
        label: 'Жобалар',
        icon: 'pi pi-folder',
        badge: '5',
        command: () => this.router.navigate(['/projects']),
      },
      {
        label: 'Профиль',
        icon: 'pi pi-user',
        command: () => this.router.navigate(['/profile']),
      },
      {
        label: 'Шығу',
        icon: 'pi pi-sign-out',
        // command: () => this.router.navigate(['/login'])
      },
    ];
  }

  openNotifications(): void {
    this.notificationService.toggleSidebar();
  }

  navigateProjects(): void {
    this.router.navigate(['/projects']);
  }

  public toggleDarkMode(): void {
    const element = document.querySelector('html');
    const isDark = element!.classList.toggle('my-app-dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
  
}
