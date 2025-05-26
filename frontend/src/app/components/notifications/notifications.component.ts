// src/app/components/notifications/notifications.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  DestroyRef,
  inject,
  signal,
  computed
} from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { CardModule }   from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { RouterLink }   from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NotificationService } from '../../services/notification.service';
import { Notification }        from '../../interfaces/models/notifications.model';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    DrawerModule,
    CardModule,
    ButtonModule,
    AvatarModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent implements OnInit {
  private notificationService = inject(NotificationService);
  private destroyRef          = inject(DestroyRef);

  // sidebar visibility
  public visible$ = this.notificationService.sidebarVisibility$;

  // хранит локально список уведомлений
  public notifications = signal<Notification[]>([]);

  // подсчёт непрочитанных
  public unreadCount = computed(() =>
    this.notifications().filter(n => !n.isRead).length
  );

  ngOnInit(): void {
    // подгружаем и слушаем поток уведомлений
    this.notificationService.notifications$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(list => this.notifications.set(list));
  }

  onDrawerHide() {
    this.notificationService.closeSidebar();
  }

  markAsRead(n: Notification) {
    if (n.isRead) return;
    this.notificationService
      .markAsRead(n.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(updated => {
        this.notifications.update(list =>
          list.map(x => x.id === updated.id ? updated : x)
        );
      });
  }

  deleteNotification(id: string) {
    this.notificationService
      .deleteNotification(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.notifications.update(list =>
          list.filter(x => x.id !== id)
        );
      });
  }

  // пример навигации — замените на реальный роут
  getLink(n: Notification): any[] {
    return ['/all-tasks'];
  }

  markAllRead() {
    this.notifications().forEach(n => this.markAsRead(n));
  }
}
