// src/app/services/notification.service.ts
import { inject, Injectable, OnDestroy } from '@angular/core';
import { ApiService } from './api.service';
import { Notification } from '../interfaces/models/notifications.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class NotificationService
  extends ApiService<Notification>
  implements OnDestroy
{
  protected path = 'notifications';

  private sidebarVisible = new BehaviorSubject<boolean>(false);
  public sidebarVisibility$ = this.sidebarVisible.asObservable();

  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  private socket!: Socket;

  constructor() {
    super();
    this.initSocket();
  }

  public toggleSidebar(): void {
    this.sidebarVisible.next(!this.sidebarVisible.value);
  }

  public closeSidebar(): void {
    this.sidebarVisible.next(false);
  }

  public loadMyNotifications(): void {
    this.getAll().subscribe((notifications) => {
      this.notificationsSubject.next(notifications);
    });
  }

  public createNotification(
    data: Partial<Notification>
  ): Observable<Notification> {
    return this.create(data).pipe(
      tap((newNotification) => {
        this.notificationsSubject.next([
          newNotification,
          ...this.notificationsSubject.value,
        ]);
      })
    );
  }

  public markAsRead(id: string): Observable<Notification> {
    return this.http
      .patch<Notification>(`${this.apiUrl}/${this.path}/${id}/read`, {})
      .pipe(
        tap((updated) => {
          const updatedList = this.notificationsSubject.value.map((n) =>
            n.id === id ? updated : n
          );
          this.notificationsSubject.next(updatedList);
        })
      );
  }

  public deleteNotification(id: string): Observable<void> {
    return this.delete(id).pipe(
      tap(() => {
        const filtered = this.notificationsSubject.value.filter(
          (n) => n.id !== id
        );
        this.notificationsSubject.next(filtered);
      })
    );
  }

  // src/app/services/notification.service.ts
  private initSocket(): void {
    const token = localStorage.getItem('access_token') || '';

    // явно указываем backend URL и namespace /notifications
    this.socket = io('http://localhost:3000/notifications', {
      transports: ['websocket'], // чтобы сразу WebSocket, а не polling
      auth: { token },  
    });

    this.socket.on('connect', () =>
      console.log('WS connected, socket id:', this.socket.id)
    );
    this.socket.on('notification', (notif: Notification) => {
      console.log('🔔 WS got notification:', notif);

      // 1) добавляем в общий список
      this.notificationsSubject.next([
        notif,
        ...this.notificationsSubject.value,
      ]);
    });
    this.socket.on('disconnect', (reason) =>
      console.log('WS disconnected:', reason)
    );
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
