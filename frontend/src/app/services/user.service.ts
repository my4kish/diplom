import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../interfaces/models/user.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService extends ApiService<User> {
  protected path = 'user';

  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Загрузить всех пользователей
  public loadUsers(): void {
    this.getAll().subscribe((users) => {
      this.usersSubject.next(users);
    });
  }

  // Создать пользователя
  public createUser(user: Partial<User>): Observable<User> {
    return this.create(user).pipe(
      tap((newUser) => {
        this.usersSubject.next([...this.usersSubject.value, newUser]);
      })
    );
  }

  // Удалить пользователя
  public deleteUser(id: string): Observable<void> {
    return this.delete(id).pipe(
      tap(() => {
        const next = this.usersSubject.value.filter((u) => u.id !== id);
        this.usersSubject.next(next);
      })
    );
  }

  // Получить текущего авторизованного пользователя
  public getCurrentUser(): Observable<User> {
    return this.http
      .get<User>(`${this.apiUrl}/${this.path}/me`)
      .pipe(tap((user) => this.currentUserSubject.next(user)));
  }

  /**
   * Обновить данные профиля (без аватара) — вызывает PUT /user/:id/data
   */
  public updateUserData(id: string, data: Partial<User>): Observable<User> {
    return this.http
      .put<User>(`${this.apiUrl}/${this.path}/${id}/data`, data)
      .pipe(
        tap(updated => {
          // обновляем локальный список и текущего юзера
          this.usersSubject.next(this.usersSubject.value.map(u => u.id === id ? updated : u));
          if (this.currentUserSubject.value?.id === id) {
            this.currentUserSubject.next(updated);
          }
        })
      );
  }

  /**
   * Обновить профиль с аватаром — вызывает PUT /user/:id  (FormData)
   */
  public updateUserWithForm(id: string, formData: FormData): Observable<User> {
    return this.http
      .put<User>(`${this.apiUrl}/${this.path}/${id}`, formData)
      .pipe(
        tap(updated => {
          this.usersSubject.next(this.usersSubject.value.map(u => u.id === id ? updated : u));
          if (this.currentUserSubject.value?.id === id) {
            this.currentUserSubject.next(updated);
          }
        })
      );
  }
}
