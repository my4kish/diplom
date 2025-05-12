import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../interfaces/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService extends ApiService<User> {
  protected path = 'user';
}
