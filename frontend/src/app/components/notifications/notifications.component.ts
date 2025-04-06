import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { NotificationService } from '../../services/notifiaction.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-notifications',
  imports: [DrawerModule, CardModule, ButtonModule, AvatarModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent implements OnInit {
  public visible: boolean = false;
  private readonly notificationService = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.notificationService.sidebarVisibility$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => console.log('✅ takeUntilDestroyed() завершил поток'))
      )
      .subscribe((state: boolean) => {
        this.visible = state;
        this.cdr.markForCheck();
      });
  }

  onDrawerHide() {
    this.notificationService.closeSidebar();
  }

}
