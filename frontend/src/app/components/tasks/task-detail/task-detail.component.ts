// src/app/components/tasks/task-detail/task-detail.component.ts
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { GalleriaModule } from 'primeng/galleria';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TaskService } from '../../../services/task.service';
import { Task, TaskStatus, Priority } from '../../../interfaces/models/task.model';
import { taskComment } from '../../../interfaces/models/comment.model';
import { TaskCommentsListComponent } from './task-comments-list/task-comments-list.component';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    PanelModule,
    TagModule,
    DividerModule,
    AvatarModule,
    TooltipModule,
    GalleriaModule,
    TaskCommentsListComponent
  ],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailComponent implements OnInit {
  private readonly route       = inject(ActivatedRoute);
  private readonly taskService = inject(TaskService);

  /** Поток с детализированными данными задачи */
  public task$!: Observable<Task>;

  /** Поток с картинками для Galleria */
  public images$!: Observable<{ itemImageSrc: string; thumbnailImageSrc: string }[]>;

  public displayCustom = false;
  public activeIndex   = 0;

  /** Чтобы в шаблоне можно было писать Priority.High и т.п. */
  public readonly Priority = Priority;

  /** Параметры адаптива для галереи */
  public readonly responsiveOptions = [
    { breakpoint: '1300px', numVisible: 4 },
    { breakpoint: '575px',  numVisible: 1 }
  ];

  ngOnInit(): void {
    this.task$ = this.route.paramMap.pipe(
      map(pm => pm.get('taskId')!),               // читаем :taskId из URL
      switchMap(id => this.taskService.getById(id)) // подгружаем задачу
    );

    this.images$ = this.task$.pipe(
      map(task =>
        task.imgUrls.map(url => ({
          itemImageSrc: url,
          thumbnailImageSrc: url
        }))
      )
    );
  }

  /** Обработчик клика по миниатюре */
  public imageClick(index: number): void {
    this.activeIndex  = index;
    this.displayCustom = true;
  }

  /** Преобразование статуса в цвет для p-tag */
  public getSeverity(status: TaskStatus): 'success' | 'info' | 'warn' | 'danger' {
    switch (status) {
      case TaskStatus.New:        return 'info';
      case TaskStatus.InProgress: return 'info';
      case TaskStatus.Completed:  return 'success';
      case TaskStatus.Overdue:    return 'danger';
      default:                    return 'info';
    }
  }

  /** Перевод статуса на казахский для отображения */
  public switchStatus(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.New:        return 'Жаңа';
      case TaskStatus.InProgress: return 'Жұмыс барысында';
      case TaskStatus.Completed:  return 'Орындалды';
      case TaskStatus.Overdue:    return 'Мерзімі өтті';
      default:                    return '';
    }
  }
}
