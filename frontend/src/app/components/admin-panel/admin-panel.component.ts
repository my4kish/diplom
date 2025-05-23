import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-admin-panel',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    PanelModule,
    TableModule,
    TabsModule,
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPanelComponent {}
