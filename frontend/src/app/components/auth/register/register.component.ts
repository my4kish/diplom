import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { passwordMatchValidator } from './password-match.validator';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { UserRegisterInterface } from '../../../interfaces/register.interface';
import { DividerModule } from 'primeng/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    DividerModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly router = inject(Router);
  public readonly registrationForm: FormGroup;
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  constructor() {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.maxLength(50)]],
        lastName: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator }
    );
  }

  onSubmit() {
    const formData = this.registrationForm.value;
    const dataToSend: UserRegisterInterface = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };
    if (this.registrationForm.valid) {
      console.log('Форма отправлена:', dataToSend);
      this.authService.register(dataToSend);
      this.router.navigate(['/login'])
    } else {
      console.log('Форма содержит ошибки.');
    }
  }
}
