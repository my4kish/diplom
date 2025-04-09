import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { UsersGroupTooltipComponent } from '../shared/users-group-tooltip/users-group-tooltip.component';

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
    UsersGroupTooltipComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {

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

  getSeverity(status: string) {
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

  switchStatus(status: string) {
    switch (status) {
      case 'new':
        return 'Новая';
      case 'in_progress':
        return 'В процессе';
      case 'completed':
        return 'Выполнено';
      case 'overdue':
        return 'Просрочено';
      default:
        return undefined;
    }
  }
}
