import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TaskCommentsListComponent } from './task-comments-list/task-comments-list.component';

@Component({
  selector: 'app-task-detail',
  imports: [PanelModule, TagModule, AvatarModule, DividerModule, TaskCommentsListComponent],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailComponent {

}
