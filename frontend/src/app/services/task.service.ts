// src/app/services/task.service.ts
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Task } from "../interfaces/models/task.model";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpParams } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class TaskService extends ApiService<Task> {
  /** Точка входа API для задач */
  protected path = 'tasks'; // или 'tasks' в зависимости от вашего бекенда

  /** Приватный стейт */
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);
  /** Публичный Observable для компонентов */
  public readonly tasks$ = this.tasksSubject.asObservable();

  /**
   * Загрузить все задачи (с опциональными параметрами фильтрации)
   * и положить их в локальный стейт
   */
  loadTasks(params?: HttpParams): void {
    this.getAll(params)
      .subscribe(tasks => this.tasksSubject.next(tasks));
  }

  /**
   * Получить одну задачу из текущего стейта (без HTTP-запроса)
   */
  getTaskFromState(id: string): Task | undefined {
    return this.tasksSubject.value.find(t => t.id === id);
  }

  /**
   * Создать новую задачу на бэкенде
   * и добавить её в стейт
   */
  createTask(data: Partial<Task>): Observable<Task> {
    return this.create(data).pipe(
      tap(newTask => {
        const current = this.tasksSubject.value;
        this.tasksSubject.next([...current, newTask]);
      })
    );
  }

  /**
   * Обновить задачу на бэкенде
   * и заменить её в стейте
   */
  updateTask(id: string, data: Partial<Task>): Observable<Task> {
    return this.update(id, data).pipe(
      tap(updated => {
        const updatedList = this.tasksSubject.value.map(t =>
          t.id === id ? updated : t
        );
        this.tasksSubject.next(updatedList);
      })
    );
  }

  /**
   * Удалить задачу на бэкенде
   * и убрать её из стейта
   */
  deleteTask(id: string): Observable<void> {
    return this.delete(id).pipe(
      tap(() => {
        const filtered = this.tasksSubject.value.filter(t => t.id !== id);
        this.tasksSubject.next(filtered);
      })
    );
  }

  findByUser(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/${this.path}/my`)
  }

  findByProject(projectId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/${this.path}/project/${projectId}`)
  }
}
