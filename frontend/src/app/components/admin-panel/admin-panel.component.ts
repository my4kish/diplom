import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';

import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { map, Observable } from 'rxjs';
import { User } from '../../interfaces/models/user.model';
import { Project } from '../../interfaces/models/project.model';
import { Task } from '../../interfaces/models/task.model';
import { UsersTableComponent } from './users-table/users-table.component';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { TasksTableComponent } from './tasks-table/tasks-table.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    PanelModule,
    TableModule,
    TabsModule,
    TagModule,
    InputTextModule,
    UsersTableComponent,
    ProjectsTableComponent,
    TasksTableComponent
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPanelComponent {
  private readonly userService = inject(UserService);
  private readonly projectService = inject(ProjectService);
  private readonly taskService = inject(TaskService);

  users$: Observable<User[]> = this.userService.users$;
  projects$: Observable<Project[]> = this.projectService.projects$;
  tasks$: Observable<Task[]> = this.taskService.tasks$;

  usersCount$ = this.users$.pipe(map((users) => users.length));
  projectsCount$ = this.projects$.pipe(map((projects) => projects.length));
  tasksCount$ = this.tasks$.pipe(map((tasks) => tasks.length));

  constructor() {
    this.userService.loadUsers();
    this.projectService.loadProjects();
    this.taskService.loadTasks();
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'new':
        return 'Жаңа';
      case 'in_progress':
        return 'Жұмыс барысында';
      case 'completed':
        return 'Орындалды';
      case 'overdue':
        return 'Мерзімі өтті';
      default:
        return status;
    }
  }

  getStatusColor(status: string): 'success' | 'secondary' | 'info' | 'danger' {
    switch (status) {
      case 'new':
        return 'secondary';
      case 'in_progress':
        return 'info';
      case 'completed':
        return 'success';
      case 'overdue':
        return 'danger';
      default:
        return 'secondary';
    }
  }
}
