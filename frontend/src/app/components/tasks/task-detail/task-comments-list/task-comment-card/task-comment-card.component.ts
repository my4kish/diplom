import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-task-comment-card',
  imports: [CardModule, AvatarModule],
  templateUrl: './task-comment-card.component.html',
  styleUrl: './task-comment-card.component.scss',
})
export class TaskCommentCardComponent {}
