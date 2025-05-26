import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  DestroyRef,
  signal,
  computed,
  effect,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { DialogModule, Dialog } from '@angular/cdk/dialog';

import { TaskCardComponent } from './task-card/task-card.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskService } from '../../../services/task.service';
import { Task, TaskStatus } from '../../../interfaces/models/task.model';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    CommonModule,
    PanelModule,
    ButtonModule,
    DialogModule,
    TaskCardComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(Dialog);
  private readonly destroyRef = inject(DestroyRef);

  public readonly projectId = this.route.snapshot.paramMap.get('projectId')!;
  private readonly tasksSignal = signal<Task[]>([]);

  public readonly newTasks = computed(() =>
    this.tasksSignal().filter((t) => t.status === 'new')
  );
  public readonly inProgress = computed(() =>
    this.tasksSignal().filter((t) => t.status === 'in_progress')
  );
  public readonly completed = computed(() =>
    this.tasksSignal().filter((t) => t.status === 'completed')
  );
  public readonly overdue = computed(() =>
    this.tasksSignal().filter((t) => t.status === 'overdue')
  );

  ngOnInit(): void {
    this.taskService
      .findByProject(this.projectId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tasks) => this.tasksSignal.set(tasks));
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: { projectId: this.projectId },
    });
    dialogRef.closed.subscribe((taskId => {
      const id = taskId as string | undefined;
      if (id) {
        // Задача была успешно создана, обновляем список
        this.taskService
          .findByProject(this.projectId)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((tasks) => this.tasksSignal.set(tasks));
      }
    }));
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      const newStatus = event.container.id as TaskStatus;

      if (task.status === newStatus) return;

      this.taskService
        .updateTask(task.id, { status: newStatus })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((updated) => {
          const updatedTasks = this.tasksSignal().map((t) =>
            t.id === updated.id ? updated : t
          );
          this.tasksSignal.set(updatedTasks);

          // CDK переместит элемент визуально — логика корректна
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        });
    }
  }
}
