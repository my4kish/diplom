import { Component } from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { TaskCommentCardComponent } from './task-comment-card/task-comment-card.component';

@Component({
  selector: 'app-task-comments-list',
  imports: [TextareaModule, InputGroupModule, InputGroupAddonModule, ButtonModule, TaskCommentCardComponent],
  templateUrl: './task-comments-list.component.html',
  styleUrl: './task-comments-list.component.scss'
})
export class TaskCommentsListComponent {

}
