import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TaskCommentsListComponent } from './task-comments-list/task-comments-list.component';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-task-detail',
  imports: [
    PanelModule,
    TagModule,
    AvatarModule,
    DividerModule,
    TaskCommentsListComponent,
    TooltipModule,
    CommonModule,
    GalleriaModule,
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailComponent implements OnInit {
  public usersLength: number = 0;
  displayCustom: boolean | undefined;

  activeIndex: number = 0;

  ngOnInit(): void {
    this.usersLength = 2;
  }

  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];

  images = [
    {
      itemImageSrc:
        'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/primeng-p1idp43jp5eo7fldqh2rsn.png/primeng-rmzzznumiscqq312n5m3wf.png?_a=DATAdtAAZAA0',
      thumbnailImageSrc:
        'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/primeng-p1idp43jp5eo7fldqh2rsn.png/primeng-rmzzznumiscqq312n5m3wf.png?_a=DATAdtAAZAA0',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc: 'https://www.primefaces.org/presskit/primeng-logo.png',
      thumbnailImageSrc: 'https://www.primefaces.org/presskit/primeng-logo.png',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc:
        'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/primeng-p1idp43jp5eo7fldqh2rsn.png/primeng-rmzzznumiscqq312n5m3wf.png?_a=DATAdtAAZAA0',
      thumbnailImageSrc:
        'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/primeng-p1idp43jp5eo7fldqh2rsn.png/primeng-rmzzznumiscqq312n5m3wf.png?_a=DATAdtAAZAA0',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc: 'https://www.primefaces.org/presskit/primeng-logo.png',
      thumbnailImageSrc: 'https://www.primefaces.org/presskit/primeng-logo.png',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc:
        'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/primeng-p1idp43jp5eo7fldqh2rsn.png/primeng-rmzzznumiscqq312n5m3wf.png?_a=DATAdtAAZAA0',
      thumbnailImageSrc:
        'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/primeng-p1idp43jp5eo7fldqh2rsn.png/primeng-rmzzznumiscqq312n5m3wf.png?_a=DATAdtAAZAA0',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc: 'https://www.primefaces.org/presskit/primeng-logo.png',
      thumbnailImageSrc: 'https://www.primefaces.org/presskit/primeng-logo.png',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc:
        'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/primeng-p1idp43jp5eo7fldqh2rsn.png/primeng-rmzzznumiscqq312n5m3wf.png?_a=DATAdtAAZAA0',
      thumbnailImageSrc:
        'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/primeng-p1idp43jp5eo7fldqh2rsn.png/primeng-rmzzznumiscqq312n5m3wf.png?_a=DATAdtAAZAA0',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc: 'https://www.primefaces.org/presskit/primeng-logo.png',
      thumbnailImageSrc: 'https://www.primefaces.org/presskit/primeng-logo.png',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc:
        'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/primeng-p1idp43jp5eo7fldqh2rsn.png/primeng-rmzzznumiscqq312n5m3wf.png?_a=DATAdtAAZAA0',
      thumbnailImageSrc:
        'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/primeng-p1idp43jp5eo7fldqh2rsn.png/primeng-rmzzznumiscqq312n5m3wf.png?_a=DATAdtAAZAA0',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
  ];

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }
}
