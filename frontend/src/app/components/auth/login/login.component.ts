import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserLoginInterface } from '../../../interfaces/login.interface';
import { AuthService } from '../../../services/auth.service';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-login',
  imports: [
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    DividerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public readonly loginForm: FormGroup;
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    const formData = this.loginForm.value;
    const dataToSend: UserLoginInterface = {
      email: formData.email,
      password: formData.password,
    };
    if (this.loginForm.valid) {
      console.log('Форма отправлена:', dataToSend);
      this.authService.login(dataToSend);
    } else {
      console.log('Форма содержит ошибки.');
    }
  }
}
