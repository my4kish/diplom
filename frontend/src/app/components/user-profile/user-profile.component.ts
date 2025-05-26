// src/app/components/user-profile/user-profile.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule }  from 'primeng/panel';
import { CardModule }   from 'primeng/card';
import { ChartModule }  from 'primeng/chart';
import { Observable, combineLatest, map, shareReplay, switchMap } from 'rxjs';

import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { User }        from '../../interfaces/models/user.model';
import { Task }        from '../../interfaces/models/task.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    PanelModule,
    CardModule,
    ChartModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  private userService = inject(UserService);
  private taskService = inject(TaskService);

  public user$!: Observable<User>;
  public data: any;
  public options: any;

  ngOnInit(): void {
    // 1) получаем профиль
    this.user$ = this.userService.getCurrentUser().pipe(shareReplay(1));

    // 2) по профилю грузим задачи
    const stats$ = this.user$.pipe(
      switchMap(user => this.taskService.findByUser()),
      map(tasks => ({
        completed:  tasks.filter(t => t.status === 'completed').length,
        inProgress: tasks.filter(t => t.status === 'in_progress').length,
        overdue:    tasks.filter(t => t.status === 'overdue').length
      })),
      shareReplay(1)
    );

    // 3) собираем данные для графика
    combineLatest([stats$]).subscribe(([s]) => {
      const style = getComputedStyle(document.documentElement);
      const textColor = style.getPropertyValue('--p-text-color');
      this.data = {
        labels: ['Орындалған', 'Жұмыс барысында', 'Мерзімі өтті'],
        datasets: [{
          data: [s.completed, s.inProgress, s.overdue],
          backgroundColor: [
            style.getPropertyValue('--p-cyan-500'),
            style.getPropertyValue('--p-orange-500'),
            style.getPropertyValue('--p-gray-500')
          ],
          hoverBackgroundColor: [
            style.getPropertyValue('--p-cyan-400'),
            style.getPropertyValue('--p-orange-400'),
            style.getPropertyValue('--p-gray-400')
          ]
        }]
      };
      this.options = {
        cutout: '60%',
        plugins: {
          legend: { labels: { color: textColor } }
        }
      };
    });
  }
}
