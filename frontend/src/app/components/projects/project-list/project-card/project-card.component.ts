import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-card',
  imports: [CardModule, ButtonModule, RouterLink],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  public readonly projectId = 2;
  public readonly projectLink = `/projects/${this.projectId}/tasks`;
}
