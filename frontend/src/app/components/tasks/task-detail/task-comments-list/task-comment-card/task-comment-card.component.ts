import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-task-comment-card',
  imports: [CardModule, AvatarModule, RouterLink],
  templateUrl: './task-comment-card.component.html',
  styleUrl: './task-comment-card.component.scss',
})
export class TaskCommentCardComponent {}
