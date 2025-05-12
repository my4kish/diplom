import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MainComponent } from './components/main/main.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { TaskDetailComponent } from './components/tasks/task-detail/task-detail.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent, canActivate: [authGuard] },
  {
    path: 'projects',
    component: ProjectListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'projects/:projectId/tasks',
    component: TaskListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'task/:taskId',
    component: TaskDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [authGuard],
  },
  { path: 'profile', component: MyProfileComponent, canActivate: [authGuard] },
  {
    path: 'all-tasks',
    loadComponent: () =>
      import('./components/all-tasks/all-tasks.component').then(
        (m) => m.AllTasksComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'profiles/:userId',
    loadComponent: () =>
      import('./components/user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin-panel/admin-panel.component').then(
        (m) => m.AdminPanelComponent
      ),
    canActivate: [authGuard],
  },
];
