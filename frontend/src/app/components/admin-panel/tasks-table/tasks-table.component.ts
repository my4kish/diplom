import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Task,
  TaskStatus,
  Priority,
} from '../../../interfaces/models/task.model';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TagModule } from 'primeng/tag';

import { TaskService } from '../../../services/task.service';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ConfirmDialogModule,
    TagModule,
    IconField,
    InputIcon,
    CalendarModule
  ],
  providers: [ConfirmationService],
  templateUrl: './tasks-table.component.html',
})
export class TasksTableComponent {
  @Input() tasks: Task[] = [];
  selectedTasks: Task[] = [];
  searchValue: string = '';

  editTask: Task | null = null;
  editedTitle = '';
  editedDescription = '';
  editedStatus: TaskStatus = TaskStatus.New;
  editedPriority: Priority = Priority.Medium;
  editedDueDate: Date = new Date();

  readonly statusOptions = [
    { label: 'Жаңа', value: 'new' },
    { label: 'Жұмыс барысында', value: 'in_progress' },
    { label: 'Орындалды', value: 'completed' },
    { label: 'Мерзімі өтті', value: 'overdue' },
  ];

  readonly priorityOptions = [
    { label: 'Төмен', value: 'low' },
    { label: 'Орташа', value: 'medium' },
    { label: 'Жоғары', value: 'high' },
  ];

  constructor(
    private taskService: TaskService,
    private confirmationService: ConfirmationService
  ) {}

  onEditInit(task: Task): void {
    this.editTask = { ...task };
    this.editedTitle = task.title;
    this.editedDescription = task.description ?? '';
    this.editedStatus = task.status ?? TaskStatus.New;
    this.editedPriority = task.priority;
    this.editedDueDate = task.dueDate ? new Date(task.dueDate) : new Date();
  }

  onSave(task: Task): void {
    this.taskService
      .updateTask(task.id, {
        title: this.editedTitle,
        description: this.editedDescription,
        status: this.editedStatus,
        priority: this.editedPriority,
        dueDate: this.editedDueDate
      })
      .subscribe((updated) => {
        const index = this.tasks.findIndex((t) => t.id === updated.id);
        if (index !== -1) {
          this.tasks[index] = updated;
        }
        this.editTask = null;
      });
  }

  onCancel(): void {
    this.editTask = null;
  }

  confirmDelete(task: Task): void {
    this.confirmationService.confirm({
      message: `Тапсырманы өшіргіңіз келе ме? (${task.title})`,
      header: 'Құптау',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Иә',
      rejectLabel: 'Жоқ',
      accept: () => {
        this.taskService.deleteTask(task.id).subscribe(() => {
          this.tasks = this.tasks.filter((t) => t.id !== task.id);
        });
      },
    });
  }

    getStatusLabel(status: string): string {
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
        return status;
    }
  }

  getStatusColor(status: string): 'info' | 'success' | 'danger' | 'secondary' {
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
        return 'secondary';
    }
  }

  clear(table: any) {
    this.searchValue = '';
    table.clear();
  }
}
