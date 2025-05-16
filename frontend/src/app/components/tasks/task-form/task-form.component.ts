import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-task-form',
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
    ScrollPanelModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  public readonly dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  public readonly data = inject(DIALOG_DATA);

  public readonly taskPriority = [
    { label: 'Жоғары', value: 'high' },
    { label: 'Орташа', value: 'medium' },
    { label: 'Төмен', value: 'low' },
  ];

  taskForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(22)]),
    description: new FormControl('', Validators.maxLength(300)),
    priority: new FormControl('', Validators.required),
    assignedTo: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
  });
}
