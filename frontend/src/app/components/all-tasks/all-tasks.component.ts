import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Severity } from '../../interfaces/severity';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-tasks',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    AvatarModule,
    TableModule,
    TagModule,
    RouterLink,
    PanelModule,
    AvatarModule,
    TooltipModule,
  ],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllTasksComponent {
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

  public cycleStatus(task: any): void {
    if (task.status === 'overdue') return;

    switch (task.status) {
      case 'new':
        task.status = 'in_progress';
        break;
      case 'in_progress':
        task.status = 'completed';
        break;
      case 'completed':
        task.status = 'in_progress';
        break;
      default:
        task.status = 'new';
        break;
    }
  }
}
