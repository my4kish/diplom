// src/app/services/api.service.ts
import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Абстрактный дженериковый API-сервис для CRUD операций.
 *
 * T  — тип модели (например, User, Project, Task…)
 * ID — тип идентификатора (по умолчанию string для UUID)
 */
@Injectable({ providedIn: 'root' })
export abstract class ApiService<T, ID = string> {
  protected readonly http   = inject(HttpClient);
  protected readonly apiUrl = 'http://localhost:3000';

  /** В подклассах указываем свой путь, например 'users' или 'projects' */
  protected abstract path: string;

  /** Общие заголовки для JSON-запросов */
  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept:        'application/json',
    });
  }

  /** GET /{path}?… */
  public getAll(params?: HttpParams): Observable<T[]> {
    return this.http.get<T[]>(
      `${this.apiUrl}/${this.path}`,
      { headers: this.headers, params }
    );
  }

  /** GET /{path}/{id} */
  public getById(id: ID): Observable<T> {
    return this.http.get<T>(
      `${this.apiUrl}/${this.path}/${id}`,
      { headers: this.headers }
    );
  }

  /** POST /{path} */
  public create(data: Partial<T>): Observable<T> {
    return this.http.post<T>(
      `${this.apiUrl}/${this.path}`,
      data,
      { headers: this.headers }
    );
  }

  /** PUT /{path}/{id} */
  public update(id: ID, data: Partial<T>): Observable<T> {
    return this.http.put<T>(
      `${this.apiUrl}/${this.path}/${id}`,
      data,
      { headers: this.headers }
    );
  }

  /** DELETE /{path}/{id} */
  public delete(id: ID): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${this.path}/${id}`,
      { headers: this.headers }
    );
  }
}
