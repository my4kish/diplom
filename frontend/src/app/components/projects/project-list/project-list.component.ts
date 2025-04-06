import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectCardComponent } from './project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { SpeedDialModule } from 'primeng/speeddial';

@Component({
  selector: 'app-project-list',
  imports: [ProjectCardComponent, CommonModule, SpeedDialModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent {
  public readonly projects = [
    {
      _id: '60d21b4667d0d8992e610c50',
      name: 'Project Alpha',
      description: 'This is a description of Project Alpha.',
      startDate: '2025-01-10T00:00:00Z',
      endDate: '2025-06-30T00:00:00Z',
      status: 'active',
      tasks: ['60d21b4667d0d8992e610c85', '60d21b4667d0d8992e610c86'],
      team: ['60d21b4667d0d8992e610c90', '60d21b4667d0d8992e610c91'],
      createdBy: '60d21b4667d0d8992e610c80',
      createdAt: '2025-01-05T00:00:00Z',
      updatedAt: '2025-03-20T00:00:00Z',
    },
    {
      _id: '60d21b4667d0d8992e610c51',
      name: 'Project Beta',
      description: 'This is a description of Project Beta.',
      startDate: '2025-02-15T00:00:00Z',
      endDate: '2025-08-30T00:00:00Z',
      status: 'active',
      tasks: [
        '60d21b4667d0d8992e610c87',
        '60d21b4667d0d8992e610c88',
        '60d21b4667d0d8992e610c89',
      ],
      team: [
        '60d21b4667d0d8992e610c92',
        '60d21b4667d0d8992e610c93',
        '60d21b4667d0d8992e610c94',
      ],
      createdBy: '60d21b4667d0d8992e610c81',
      createdAt: '2025-02-10T00:00:00Z',
      updatedAt: '2025-03-18T00:00:00Z',
    },
    {
      _id: '60d21b4667d0d8992e610c52',
      name: 'Project Gamma',
      description: 'This is a description of Project Gamma.',
      startDate: '2024-07-01T00:00:00Z',
      endDate: '2024-12-15T00:00:00Z',
      status: 'completed',
      tasks: ['60d21b4667d0d8992e610c95', '60d21b4667d0d8992e610c96'],
      team: ['60d21b4667d0d8992e610c95', '60d21b4667d0d8992e610c96'],
      createdBy: '60d21b4667d0d8992e610c82',
      createdAt: '2024-06-15T00:00:00Z',
      updatedAt: '2024-12-20T00:00:00Z',
    },
    {
      _id: '60d21b4667d0d8992e610c53',
      name: 'Project Delta',
      description: 'This is a description of Project Delta.',
      startDate: '2023-05-10T00:00:00Z',
      endDate: '2023-11-25T00:00:00Z',
      status: 'archived',
      tasks: ['60d21b4667d0d8992e610c97', '60d21b4667d0d8992e610c98'],
      team: ['60d21b4667d0d8992e610c97', '60d21b4667d0d8992e610c98'],
      createdBy: '60d21b4667d0d8992e610c83',
      createdAt: '2023-04-20T00:00:00Z',
      updatedAt: '2023-12-01T00:00:00Z',
    },
  ];
}
