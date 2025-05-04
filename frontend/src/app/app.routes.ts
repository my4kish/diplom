import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MainComponent } from './components/main/main.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { TaskDetailComponent } from './components/tasks/task-detail/task-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/:projectId/tasks', component: TaskListComponent },
  { path: 'task/:taskId', component: TaskDetailComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'profile', component: MyProfileComponent },
  {
    path: 'all-tasks',
    loadComponent: () =>
      import('./components/all-tasks/all-tasks.component').then(
        (m) => m.AllTasksComponent
      ),
  },
  {
    path: 'profiles/:userId',
    loadComponent: () =>
      import('./components/user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent
      ),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin-panel/admin-panel.component').then(
        (m) => m.AdminPanelComponent
      ),
  },
];
