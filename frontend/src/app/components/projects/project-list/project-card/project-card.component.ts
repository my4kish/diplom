import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  Dialog,
  DialogModule,
} from '@angular/cdk/dialog';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { ProjectFormComponent } from '../../project-form/project-form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogModule as primeDialog } from 'primeng/dialog';
import { Severity } from '../../../../interfaces/severity';

@Component({
  selector: 'app-project-card',
  imports: [
    CardModule,
    ButtonModule,
    RouterLink,
    TagModule,
    DialogModule,
    primeDialog,
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  private readonly dialog = inject(Dialog);
  private readonly destroyRef = inject(DestroyRef);
  public visible: boolean = false;
  
  @Input()
  project: any;
  
  @Output()
  deleteProject = new EventEmitter;

  public onDeleteProject(event: Event) {
    this.deleteProject.emit();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open<string>(ProjectFormComponent, {
      data: {
        id: this.project.id,
        name: this.project.name,
        description: this.project.description,
        status: this.project.status,
        isEdit: true,
      },
    });

    dialogRef.closed
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          console.log(result);
        }
      });
  }

  public showFullDesc(): void {
    this.visible = true;
  }

  public getSeverity(status: string): Severity {
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

  public switchStatus(status: string): string {
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
