import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProjectFormComponent } from '../project-form/project-form.component';
import {
  Dialog,
  DialogRef,
  DIALOG_DATA,
  DialogModule,
} from '@angular/cdk/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-project-create-card',
  imports: [CardModule, ButtonModule],
  templateUrl: './project-create-card.component.html',
  styleUrl: './project-create-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCreateCardComponent {
  private readonly dialog = inject(Dialog);
  private readonly destroyRef = inject(DestroyRef);
  
  public openDialog(): void {
    const dialogRef = this.dialog.open(ProjectFormComponent);

    dialogRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      if(result) {
        console.log(result);
      }
    });
  }
}
