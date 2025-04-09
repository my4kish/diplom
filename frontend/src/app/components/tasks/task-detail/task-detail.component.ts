import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TaskCommentsListComponent } from './task-comments-list/task-comments-list.component';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { UsersGroupTooltipComponent } from '../../shared/users-group-tooltip/users-group-tooltip.component';

@Component({
  selector: 'app-task-detail',
  imports: [
    PanelModule,
    TagModule,
    AvatarModule,
    AvatarGroupModule,
    DividerModule,
    TaskCommentsListComponent,
    TooltipModule,
    CommonModule,
    UsersGroupTooltipComponent,
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailComponent implements OnInit{
  public usersLength:number = 0;

  ngOnInit(): void {
    this.usersLength = 2;
  }

}
