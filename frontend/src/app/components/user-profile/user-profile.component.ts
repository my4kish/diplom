import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-user-profile',
  imports: [CardModule, PanelModule, AvatarModule, ChartModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  public data: any;
  public options: any;
  private readonly cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.initChart();
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    this.data = {
      labels: ['Выполненные', 'В процессе', 'Просроченные'],
      datasets: [
        {
          data: [3, 5, 10],
          backgroundColor: [
            documentStyle.getPropertyValue('--p-cyan-500'),
            documentStyle.getPropertyValue('--p-orange-500'),
            documentStyle.getPropertyValue('--p-gray-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--p-cyan-400'),
            documentStyle.getPropertyValue('--p-orange-400'),
            documentStyle.getPropertyValue('--p-gray-400'),
          ],
        },
      ],
    };

    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };
    this.cd.markForCheck();
  }
}
