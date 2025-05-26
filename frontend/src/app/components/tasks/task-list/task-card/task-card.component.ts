import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Severity } from '../../../../interfaces/severity';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-task-card',
  imports: [
    CommonModule,
    Card,
    TagModule,
    ChipModule,
    RouterLink,
    AvatarModule
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardComponent {
  @Input()
  item: any;

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

  public getPriorityColor(priority: string): string {
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
