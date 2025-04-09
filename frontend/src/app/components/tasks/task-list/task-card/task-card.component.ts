import { Component, Input } from '@angular/core';
import { Card } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsersGroupTooltipComponent } from '../../../shared/users-group-tooltip/users-group-tooltip.component';

@Component({
  selector: 'app-task-card',
  imports: [
    CommonModule,
    Card,
    TagModule,
    ChipModule,
    RouterLink,
    UsersGroupTooltipComponent,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input()
  item: any;

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

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high':
        return 'rgba(255, 0, 0, 0.5)';
      case 'medium':
        return 'rgba(255, 165, 0, 0.5)';
      case 'low':
        return 'rgba(255, 255, 0, 0.5)';
      default:
        return 'rgba(128, 128, 128, 0.5)';
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
