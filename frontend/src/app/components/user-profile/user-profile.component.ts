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
import { Observable, of, switchMap, map, shareReplay } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { User } from '../../interfaces/models/user.model';

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
  private route = inject(ActivatedRoute);

  public vm$!: Observable<{
    user: User;
    chartData: any;
    chartOptions: any;
  } | null>;

  ngOnInit(): void {
    this.vm$ = this.route.paramMap.pipe(
      map(params => params.get('userId')),
      switchMap(id => id ? this.userService.getById(id) : of(null)),
      switchMap(user => {
        if (!user || !user.id) return of(null);
        return this.taskService.findByUserId(user.id).pipe(
          map(tasks => {
            const completed = tasks.filter(t => t.status === 'completed').length;
            const inProgress = tasks.filter(t => t.status === 'in_progress').length;
            const overdue = tasks.filter(t => t.status === 'overdue').length;
            const style = getComputedStyle(document.documentElement);
            return {
              user,
              chartData: {
                labels: ['Орындалған', 'Жұмыс барысында', 'Мерзімі өтті'],
                datasets: [{
                  data: [completed, inProgress, overdue],
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
              },
              chartOptions: {
                cutout: '60%',
                plugins: {
                  legend: {
                    labels: {
                      color: style.getPropertyValue('--p-text-color')
                    }
                  }
                }
              }
            };
          })
        );
      }),
      shareReplay(1)
    );
  }
}
