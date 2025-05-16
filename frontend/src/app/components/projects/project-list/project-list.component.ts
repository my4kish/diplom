import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProjectCardComponent } from './project-card/project-card.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SpeedDialModule } from 'primeng/speeddial';
import { ProjectCreateCardComponent } from '../project-create-card/project-create-card.component';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project-list',
  imports: [
    ProjectCardComponent,
    CommonModule,
    SpeedDialModule,
    ProjectCreateCardComponent,
    AsyncPipe,
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent {
  private readonly projectService = inject(ProjectService);
  public projects = this.projectService.projects$;
  constructor() {
    this.projectService.loadProjects();
  }

  public onDeleteProject(id: string): void {
    this.projectService.deleteProject(id).subscribe((r) => {
      console.log(r)
    });
  }
}
