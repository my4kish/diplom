import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Severity } from '../../interfaces/severity';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { AsyncPipe } from '@angular/common';
import { Task } from '../../interfaces/models/task.model';
import { User } from '../../interfaces/models/user.model';

@Component({
  selector: 'app-main',
  imports: [
    CardModule,
    ButtonModule,
    AvatarModule,
    TableModule,
    TagModule,
    RouterLink,
    PanelModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  private readonly userService = inject(UserService);
  private readonly tasksService = inject(TaskService);
  tasks: Task[] = [];
  user: User = {} as User;

  constructor() {
    this.tasksService.loadTasks();
    this.tasksService.findByUser().subscribe((list) => {
      this.tasks = list;
    });
    this.userService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
  }

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

  public getTasksByStatus(status: string) {
    switch (status) {
      case 'in_progress':
        return this.tasks.filter((t) => t.status === 'in_progress').length;
      case 'completed':
        return this.tasks.filter((t) => t.status === 'completed').length;
      case 'overdue':
        return this.tasks.filter((t) => t.status === 'overdue').length;
      default:
        return 0;
    }
  }

  public get firstFiveTasks(): Task[] {
    return this.tasks
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }
}
