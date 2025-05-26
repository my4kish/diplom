// src/app/components/tasks/task-comments-list/task-comment-card/task-comment-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { CardModule }   from 'primeng/card';
import { taskComment }  from '../../../../../interfaces/models/comment.model';

@Component({
  selector: 'app-task-comment-card',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    AvatarModule,
    RouterLink
  ],
  templateUrl: './task-comment-card.component.html',
  styleUrls: ['./task-comment-card.component.scss']
})
export class TaskCommentCardComponent {
  @Input() comment!: taskComment;

  /** Безопасно форматируем дату */
  get formattedDate(): string {
    return formatDate(this.comment.createdAt, 'd MMM, y H:m', 'en-US');
  }
}
