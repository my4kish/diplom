import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { BadgeModule } from 'primeng/badge';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-task-list',
  imports: [
    CardModule,
    CdkDropList,
    CdkDrag,
    PanelModule,
    CommonModule,
    BadgeModule,
    AvatarGroupModule,
    AvatarModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  public readonly tasks = [
    {
      _id: '60d21b4667d0d8992e610c85',
      title: 'New Task 1',
      description: 'This is a new task 1',
      status: 'new',
      priority: 'high',
      dueDate: '2025-04-01T00:00:00Z',
      assignedTo: ['60d21b4667d0d8992e610c90'],
      projectId: '60d21b4667d0d8992e610c95',
      comments: ['60d21b4667d0d8992e610c99'],
      createdAt: '2025-03-20T00:00:00Z',
      updatedAt: '2025-03-21T00:00:00Z',
    },
    {
      _id: '60d21b4667d0d8992e610c86',
      title: 'New Task 2',
      description: 'This is a new task 2',
      status: 'in_progress',
      priority: 'medium',
      dueDate: '2025-04-05T00:00:00Z',
      assignedTo: ['60d21b4667d0d8992e610c91'],
      projectId: '60d21b4667d0d8992e610c96',
      comments: ['60d21b4667d0d8992e610c98'],
      createdAt: '2025-03-18T00:00:00Z',
      updatedAt: '2025-03-19T00:00:00Z',
    },
    {
      _id: '60d21b4667d0d8992e610c87',
      title: 'New Task 3',
      description: 'This is a new task 3',
      status: 'completed',
      priority: 'low',
      dueDate: '2025-03-15T00:00:00Z',
      assignedTo: ['60d21b4667d0d8992e610c92'],
      projectId: '60d21b4667d0d8992e610c97',
      comments: ['60d21b4667d0d8992e610c97'],
      createdAt: '2025-03-10T00:00:00Z',
      updatedAt: '2025-03-16T00:00:00Z',
    },
    {
      _id: '60d21b4667d0d8992e610c88',
      title: 'New Task 4',
      description: 'This is a new task 4',
      status: 'overdue',
      priority: 'high',
      dueDate: '2025-03-05T00:00:00Z',
      assignedTo: ['60d21b4667d0d8992e610c93'],
      projectId: '60d21b4667d0d8992e610c98',
      comments: ['60d21b4667d0d8992e610c96'],
      createdAt: '2025-02-25T00:00:00Z',
      updatedAt: '2025-03-06T00:00:00Z',
    },
    {
      _id: '60d21b4667d0d8992e610c89',
      title: 'New Task 5',
      description: 'This is a new task 5',
      status: 'in_progress',
      priority: 'medium',
      dueDate: '2025-04-10T00:00:00Z',
      assignedTo: ['60d21b4667d0d8992e610c94'],
      projectId: '60d21b4667d0d8992e610c99',
      comments: ['60d21b4667d0d8992e610c95'],
      createdAt: '2025-03-22T00:00:00Z',
      updatedAt: '2025-03-23T00:00:00Z',
    },
  ];

  public readonly new = this.tasks.filter((task) => task.status === 'new');
  public readonly inProgress = this.tasks.filter(
    (task) => task.status === 'in_progress'
  );
  public readonly completed = this.tasks.filter(
    (task) => task.status === 'completed'
  );
  public readonly overdue = this.tasks.filter(
    (task) => task.status === 'overdue'
  );

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const task = event.previousContainer.data[event.previousIndex];

      // Определяем новый статус на основе контейнера
      const newStatus = event.container.id;

      // Обновляем статус задачи
      task.status = newStatus;

      // Перемещаем задачу
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
