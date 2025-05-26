// src/app/components/my-profile/my-profile.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/models/user.model';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    PanelModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    SelectModule,
    TextareaModule,
  ],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyProfileComponent implements OnInit {
  private userService = inject(UserService);

  public gender = ['Ер', 'Әйел'];
  public isEditing = false;
  public user!: User;
  public userForm!: FormGroup;
  public uploadedFiles: File[] = [];

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.userForm = new FormGroup({
        firstName: new FormControl(user.firstName, Validators.required),
        lastName: new FormControl(user.lastName, Validators.required),
        email: new FormControl(user.email, [
          Validators.required,
          Validators.email,
        ]),
        gender: new FormControl(user.gender || ''),
        city: new FormControl(user.city || ''),
        phone: new FormControl(
          user.phone || '',
          Validators.pattern('[0-9]{10}')
        ),
        position: new FormControl(user.position || ''),
        aboutMe: new FormControl(
          user.aboutMe || '',
          Validators.maxLength(1000)
        ),
      });
      this.userForm.disable();
    });
  }

  enableEditing(): void {
    this.isEditing = true;
    this.userForm.enable();
  }

  cancelEditing(): void {
    this.userForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      gender: this.user.gender,
      city: this.user.city,
      phone: this.user.phone,
      position: this.user.position,
      aboutMe: this.user.aboutMe,
    });
    this.userForm.disable();
    this.isEditing = false;
    this.uploadedFiles = [];
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
    const values = this.userForm.value;
    // Если есть новый файл — формируем multipart
    if (this.uploadedFiles.length > 0) {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append('gender', values.gender);
      formData.append('city', values.city);
      formData.append('phone', values.phone);
      formData.append('position', values.position);
      formData.append('aboutMe', values.aboutMe);
      
      this.uploadedFiles.forEach((file) =>
        formData.append('avatar', file, file.name)
    );
    
    this.userService
    .updateUserWithForm(this.user.id, formData)
    .subscribe((updated) => this.afterSave(updated));
  } else {
      // Без файла — просто JSON, аватарка останется нетронутой
      const dto: Partial<User> = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        gender: values.gender,
        city: values.city,
        phone: values.phone,
        position: values.position,
        aboutMe: values.aboutMe,
      };

      this.userService
        .updateUserData(this.user.id, dto)
        .subscribe((updated) => this.afterSave(updated));
    }
  }

  private afterSave(updated: User) {
    this.user = updated;
    this.userForm.patchValue({
      firstName: updated.firstName,
      lastName: updated.lastName,
      email: updated.email,
      gender: updated.gender,
      city: updated.city,
      phone: updated.phone,
      position: updated.position,
      aboutMe: updated.aboutMe,
    });
    this.userForm.disable();
    this.isEditing = false;
    this.uploadedFiles = [];
  }
}
