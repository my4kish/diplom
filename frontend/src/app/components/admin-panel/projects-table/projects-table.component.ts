import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Project,
  ProjectStatus,
} from '../../../interfaces/models/project.model';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TagModule } from 'primeng/tag';

import { ProjectService } from '../../../services/project.service';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component({
  selector: 'app-projects-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ConfirmDialogModule,
    TagModule,
    IconField,
    InputIcon,
  ],
  providers: [ConfirmationService],
  templateUrl: './projects-table.component.html',
})
export class ProjectsTableComponent {
  @Input() projects: Project[] = [];
  selectedProjects: Project[] = [];
  searchValue: string = '';

  editProject: Project | null = null;
  editedName: string = '';
  editedDescription: string = '';
  editedStatus: ProjectStatus = ProjectStatus.Active;

  readonly statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
    { label: 'Archived', value: 'archived' },
  ];

  constructor(
    private projectService: ProjectService,
    private confirmationService: ConfirmationService
  ) {}

  onEditInit(project: Project): void {
    this.editProject = { ...project };
    this.editedName = project.name;
    this.editedDescription = project.description ?? '';
    this.editedStatus = project.status;
  }

  onSave(project: Project): void {
    this.projectService
      .updateProject(project.id, {
        name: this.editedName,
        description: this.editedDescription,
        status: this.editedStatus,
      })
      .subscribe((updated) => {
        const index = this.projects.findIndex((p) => p.id === updated.id);
        if (index !== -1) {
          this.projects[index] = updated;
        }
        this.editProject = null;
      });
  }

  onCancel(): void {
    this.editProject = null;
  }

  confirmDelete(project: Project): void {
    this.confirmationService.confirm({
      message: `Жобаны өшіргіңіз келе ме? (${project.name})`,
      header: 'Құптау',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Иә',
      rejectLabel: 'Жоқ',
      accept: () => {
        this.projectService.deleteProject(project.id).subscribe(() => {
          this.projects = this.projects.filter((p) => p.id !== project.id);
        });
      },
    });
  }

  clear(table: any) {
    this.searchValue = '';
    table.clear();
  }

  getStatusColor(
    status: string
  ): 'info' | 'success' | 'danger' | 'warn' | undefined {
    switch (status) {
      case 'active':
        return 'success';
      case 'paused':
        return 'warn';
      case 'completed':
        return 'info';
      case 'archived':
        return 'danger';
      default:
        return undefined;
    }
  }
}
