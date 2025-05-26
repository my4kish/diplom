import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { taskComment } from '../interfaces/models/comment.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommentService extends ApiService<taskComment> {
  protected path = 'comments';

  private commentsSubject = new BehaviorSubject<taskComment[]>([]);
  public comments$ = this.commentsSubject.asObservable();

  // Загрузка комментариев по задаче
  public loadCommentsByTask(taskId: string): void {
    this.http
      .get<taskComment[]>(`${this.apiUrl}/${this.path}/task/${taskId}`)
      .subscribe((comments) => {
        this.commentsSubject.next(comments);
      });
  }

  // Создание комментария
  public createComment(data: Partial<taskComment>): Observable<taskComment> {
    return this.create(data).pipe(
      tap((newComment) => {
        this.commentsSubject.next([...this.commentsSubject.value, newComment]);
      })
    );
  }

  // Обновление комментария
  public updateComment(
    id: string,
    data: Partial<taskComment>
  ): Observable<taskComment> {
    return this.update(id, data).pipe(
      tap((updated) => {
        const updatedList = this.commentsSubject.value.map((c) =>
          c.id === id ? updated : c
        );
        this.commentsSubject.next(updatedList);
      })
    );
  }

  // Удаление комментария
  public deleteComment(id: string): Observable<void> {
    return this.delete(id).pipe(
      tap(() => {
        const filtered = this.commentsSubject.value.filter((c) => c.id !== id);
        this.commentsSubject.next(filtered);
      })
    );
  }

  public findByTask(taskId: string): Observable<taskComment[]> {
    const url = `${this.apiUrl}/${this.path}/task/${taskId}`;
    return this.http
      .get<taskComment[]>(url)
      .pipe(tap((list) => this.commentsSubject.next(list)));
  }
}
