import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../interfaces/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService extends ApiService<User> {
  protected path = 'user';

  // Получить текущего пользователя (авторизованного)
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${this.path}/me`);
  }

  // Обновление данных пользователя с поддержкой загрузки изображения
  updateUser(id: string, formData: FormData): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${this.path}/${id}`, formData);
  }

  // Удаление пользователя
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.path}/${id}`);
  }
}
