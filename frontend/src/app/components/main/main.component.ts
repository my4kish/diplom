import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AsyncPipe, CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';

import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { Severity } from '../../interfaces/severity';
import { Task } from '../../interfaces/models/task.model';
import { User } from '../../interfaces/models/user.model';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    AvatarModule,
    TableModule,
    TagModule,
    RouterLink,
    PanelModule,
    CommonModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  private readonly userService = inject(UserService);
  private readonly taskService = inject(TaskService);

  user$ = this.userService.currentUser$;
  tasks$ = this.taskService.findByUser();

  firstFiveTasks$ = this.tasks$.pipe(
    map(tasks =>
      tasks
        .slice()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
    )
  );

  tasksByStatus$ = this.tasks$.pipe(
    map(tasks => ({
      completed: tasks.filter(t => t.status === 'completed').length,
      in_progress: tasks.filter(t => t.status === 'in_progress').length,
      overdue: tasks.filter(t => t.status === 'overdue').length,
      total: tasks.length,
    }))
  );

  public getSeverity(status: string): Severity {
    switch (status) {
      case 'new':
        return 'secondary';
      case 'in_progress':
        return 'info';
      case 'completed':
        return 'success';
      case 'overdue':
        return 'danger';
      default:
        return undefined;
    }
  }

  public switchStatus(status: string) {
    switch (status) {
      case 'new':
        return 'Жаңа';
      case 'in_progress':
        return 'Жұмыс барысында';
      case 'completed':
        return 'Орындалды';
      case 'overdue':
        return 'Мерзімі өтті';
      default:
        return undefined;
    }
  }
}
