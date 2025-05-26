// src/app/components/tasks/task-comments-list/task-comments-list.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { taskComment } from '../../../../interfaces/models/comment.model';
import { User }        from '../../../../interfaces/models/user.model';
import { TaskCommentCardComponent } from './task-comment-card/task-comment-card.component';
import { CommentService } from '../../../../services/comment.service';
import { UserService }    from '../../../../services/user.service';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-task-comments-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    TaskCommentCardComponent,
    TextareaModule
  ],
  templateUrl: './task-comments-list.component.html',
  styleUrls: ['./task-comments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCommentsListComponent {
  private commentService = inject(CommentService);
  private userService    = inject(UserService);

  /** Хранимая текущая задача */
  private currentTaskId!: string;

  /** Поток «сырых» комментариев */
  private rawComments$ = this.commentService.comments$;

  /** Поток пользователей */
  private users$ = this.userService.users$ as Observable<User[]>;

  /** Обогащённый поток комментариев с заполненным полем author */
  public comments$: Observable<taskComment[]> = combineLatest([
    this.rawComments$,
    this.users$,
  ]).pipe(
    map(([comments, users]) =>
      comments.map(c => ({
        ...c,
        author: users.find(u => u.id === c.authorId) || c.author
      }))
    )
  );

  /** Текст нового комментария */
  public newComment = '';

  /** При каждом `taskId` — грузим с бэкенда комментарии */
  @Input() set taskId(id: string) {
    if (id) {
      this.currentTaskId = id;
      this.commentService.findByTask(id).subscribe();  // заполняет rawComments$
      // одновременно убедимся, что юзеры подгружены
      this.userService.loadUsers();
    }
  }

  /** Добавить комментарий */
  public addComment(): void {
    const content = this.newComment.trim();
    if (!content) return;

    this.commentService
      .createComment({ taskId: this.currentTaskId, content })
      .subscribe(() => {
        this.newComment = '';
        // createComment уже пушит новый comment в rawComments$, и благодаря combineLatest
        // компонент автоматически получит обновлённый comment с автором
      });
  }

  public trackById(_idx: number, c: taskComment): string {
    return c.id;
  }
}
