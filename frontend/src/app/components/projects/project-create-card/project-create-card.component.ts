import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProjectFormComponent } from '../project-form/project-form.component';
import {
  Dialog,
  DialogRef,
  DIALOG_DATA,
  DialogModule,
} from '@angular/cdk/dialog';

@Component({
  selector: 'app-project-create-card',
  imports: [CardModule, ButtonModule, ProjectFormComponent],
  templateUrl: './project-create-card.component.html',
  styleUrl: './project-create-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCreateCardComponent {
  private readonly dialog = inject(Dialog);

  public openDialog(): void {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      backdropClass: 'blurred-backdrop',
    });

    dialogRef.closed.subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
