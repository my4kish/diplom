import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from './task-card/task-card.component';
import { ButtonModule } from 'primeng/button';
import {
  Dialog,
  DialogModule,
} from '@angular/cdk/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskService } from '../../../services/task.service';
import { Task, TaskStatus } from '../../../interfaces/models/task.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [
    CdkDropList,
    CdkDrag,
    PanelModule,
    CommonModule,
    TaskCardComponent,
    ButtonModule,
    DialogModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly taskService = inject(TaskService);
  private readonly route = inject(ActivatedRoute);
  public projectId!: string;
  dialog = inject(Dialog);

  tasks: Task[] = [];

  constructor() {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
    this.taskService.findByProject(this.projectId).subscribe((list) => {
      this.tasks = list;
      this.cdr.markForCheck();
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open<string>(TaskFormComponent);

    dialogRef.closed.subscribe();
  }

  // вместо readonly поля — геттеры
  get newTasks(): Task[] {
    return this.tasks.filter(t => t.status === 'new');
  }
  get inProgress(): Task[] {
    return this.tasks.filter(t => t.status === 'in_progress');
  }
  get completed(): Task[] {
    return this.tasks.filter(t => t.status === 'completed');
  }
  get overdue(): Task[] {
    return this.tasks.filter(t => t.status === 'overdue');
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const task     = event.previousContainer.data[event.previousIndex];
      const newStatus = event.container.id as TaskStatus;

      if (task.status === newStatus) {
        return;
      }
      // 1) обновляем статус на сервере
      this.taskService.updateTask(task.id, { status: newStatus })
        .subscribe(updated => {
          // 2) обновляем локальный массив — новая ссылка
          this.tasks = this.tasks.map(t =>
            t.id === updated.id ? updated : t
          );
          // 3) триггерим OnPush
          this.cdr.markForCheck();
          // 4) переносим карточку в другую колонку
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        });
      task.status = newStatus;
    }
  }
}
