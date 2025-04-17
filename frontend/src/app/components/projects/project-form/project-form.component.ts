import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import {
  DIALOG_DATA,
  DialogRef,
} from '@angular/cdk/dialog';

@Component({
  selector: 'app-project-form',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    TextareaModule
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormComponent {
  public readonly dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  public readonly data = inject(DIALOG_DATA);
  public readonly isEdit: boolean = this.data?.isEdit ?? false;

  projectForm: FormGroup = new FormGroup({
    name: new FormControl(this.data?.name || '', [Validators.required, Validators.maxLength(22)]),
    description: new FormControl(this.data?.description || '', Validators.maxLength(300)),
  });

  public onSubmit():void {
    this.dialogRef.close(this.projectForm.value);
  }

}
