import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserRegisterInterface } from '../interfaces/register.interface';
import { UserLoginInterface } from '../interfaces/login.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly baseApiUrl: string = 'http://localhost:3000/auth/';

  get isAuth() {
    return localStorage.getItem('access_token') ? true : false;
  }

  public register(user: UserRegisterInterface) {
    return this.http.post(`${this.baseApiUrl}register`, user).subscribe((r) => {
      console.log('response', r);
    });
  }

  public login(user: UserLoginInterface) {
    return this.http
      .post<{ access_token: string }>(`${this.baseApiUrl}login`, user)
      .subscribe((r) => {
        console.log('respone login', r);
        localStorage.setItem('access_token', r.access_token);
        this.router.navigate([''])
      });
  }

  public logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
