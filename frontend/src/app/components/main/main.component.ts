import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Severity } from '../../interfaces/severity';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main',
  imports: [
    CardModule,
    ButtonModule,
    AvatarModule,
    TableModule,
    TagModule,
    RouterLink,
    PanelModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {

  private readonly userService = inject(UserService);

  constructor() {

  }

  tasks = [
    {
      name: 'Сделать отчёт',
      status: 'in_progress',
      project: 'CRM система',
      assignee: ['Айгүл', 'Анау', 'Мынау'],
    },
    {
      name: 'Починить баг',
      status: 'completed',
      project: 'Сайт компании',
      assignee: ['Нурлан', 'Анау'],
    },
    {
      name: 'Добавить фильтры',
      status: 'new',
      project: 'Панель администратора',
      assignee: ['Данияр', 'Анау', 'Мынау'],
    },
    {
      name: 'что то просроченное',
      status: 'overdue',
      project: 'project',
      assignee: ['aaaa', 'Анау'],
    },
    {
      name: 'что то просроченное',
      status: 'overdue',
      project: 'project',
      assignee: ['aaaa', 'Анау', 'Мынау', 'Мыны'],
    },
    {
      name: 'что то просроченное',
      status: 'overdue',
      project: 'project',
      assignee: ['aaaa', 'Анау', 'Мынау'],
    },
  ];

  get displayedTasks() {
    return this.tasks.slice(0, 5)
  }

  public getSeverity(status: string): Severity {
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
        return undefined;
    }
  }

  public switchStatus(status: string) {
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
        return undefined;
    }
  }
}
