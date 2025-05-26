import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';

import { TaskService } from '../../services/task.service';
import { Task, TaskStatus } from '../../interfaces/models/task.model';
import { Severity } from '../../interfaces/severity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    AvatarModule,
    TableModule,
    TagModule,
    RouterLink,
    PanelModule,
    AvatarModule,
    TooltipModule,
  ],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllTasksComponent implements OnInit {
  private readonly tasksService = inject(TaskService);
  tasks$: Observable<Task[]>;

  constructor() {
    this.tasks$ = this.tasksService.findByUser();
  }

  ngOnInit(): void {
    this.tasksService.loadTasks(); // если нужно глобальное хранилище
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

  private getNextStatus(status: TaskStatus): TaskStatus {
    switch (status) {
      case TaskStatus.New:
        return TaskStatus.InProgress;
      case TaskStatus.InProgress:
        return TaskStatus.Completed;
      case TaskStatus.Completed:
        return TaskStatus.InProgress;
      default:
        return status;
    }
  }

  public cycleStatus(task: Task): void {
    if (task.status === TaskStatus.Overdue) {
      return; // ничего не делаем, если уже просрочено
    }

    if (task.status === undefined) {
      console.error('Task status is undefined');
      return;
    }
    const newStatus = this.getNextStatus(task.status);
    task.status = newStatus;
    this.tasksService
      .updateTask(task.id, { status: newStatus })
      .subscribe({
        error: err => {
          console.error('Не удалось сменить статус задачи', err);
        }
      });
  }
}
