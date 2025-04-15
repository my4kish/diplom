import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MainComponent } from './components/main/main.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { TaskDetailComponent } from './components/tasks/task-detail/task-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/:id/tasks', component: TaskListComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'profile', component: MyProfileComponent },
  { path: 'profile/:id', component: UserProfileComponent },
  { path: 'task/:id', component: TaskDetailComponent },
];
