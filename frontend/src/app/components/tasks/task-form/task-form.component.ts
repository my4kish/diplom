import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { ScrollPanelModule } from 'primeng/scrollpanel';

import { TaskService } from '../../../services/task.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/models/user.model';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    ReactiveFormsModule,
    TextareaModule,
    DatePickerModule,
    FileUploadModule,
    ScrollPanelModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent {
  dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  data = inject(DIALOG_DATA);
  taskService = inject(TaskService);
  userService = inject(UserService);

  users: User[] = [];

  uploadedFiles: File[] = [];

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(22)]),
    description: new FormControl('', Validators.maxLength(300)),
    priority: new FormControl('', Validators.required),
    assignedTo: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
  });

  taskPriority = [
    { label: 'Жоғары', value: 'high' },
    { label: 'Орташа', value: 'medium' },
    { label: 'Төмен', value: 'low' },
  ];

  constructor() {
    this.userService.users$.subscribe((users) => {
      this.users = users.map((user) => ({
        ...user,
        fullName: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
      }));
    });
    this.userService.loadUsers();
  }

  getFullName(user: User): string {
    return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    this.uploadedFiles = Array.from(input.files);
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const values = this.taskForm.value;
    const formData = new FormData();

    formData.append('title', values.title!);
    formData.append('description', values.description ?? '');
    formData.append('priority', values.priority!);
    formData.append('assignedToId', values.assignedTo!);
    formData.append('dueDate', new Date(values.dueDate!).toISOString());
    formData.append('projectId', this.data.projectId);

    for (const file of this.uploadedFiles) {
      formData.append('images', file);
    }

    // Вывести все значения formData
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
  
    this.taskService.createTaskWithFiles(formData).subscribe({
      next: (task) => this.dialogRef.close(task.id),
      error: (err) => console.error('Ошибка создания задачи:', err),
    });
  }
}
