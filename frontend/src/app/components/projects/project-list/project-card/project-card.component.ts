import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-project-card',
  imports: [CardModule, ButtonModule, RouterLink, TagModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  public readonly projectId = 2;
  public readonly projectLink = `/projects/${this.projectId}/tasks`;

  @Input()
  project: any;

  getSeverity(status: string) {
    switch (status) {
      case 'active':
        return 'info';
      case 'completed':
        return 'success';
      case 'archived':
        return 'secondary';
      default:
        return 'danger';
    }
  }

  switchStatus(status: string) {
    switch (status) {
      case 'active':
        return 'Активно';
      case 'completed':
        return 'Выполнено';
      case 'archived':
        return 'В архиве';
      default:
        return 'Неизвестно';
    }
  }

}
