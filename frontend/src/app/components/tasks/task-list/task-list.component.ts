import { Component } from '@angular/core';
import { TreeTableModule } from 'primeng/treetable';
import { CardModule } from 'primeng/card';

// import { DividerModule } from 'primeng/divider';
// import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-task-list',
  imports: [TreeTableModule, CardModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks = [
    {
      data: { name: 'Completed tasks', status: 'status', priority: 'priority', dueDate: 'dueDate', assignee: 'assignee' },
      children: [
        { data: { name: 'Task 1', status: 'Completed', priority: 'Medium', dueDate: '2025-03-10', assignee: 'Jane Smith' } },
        { data: { name: 'Task 2', status: 'Pending', priority: 'Low', dueDate: '2025-03-20', assignee: 'Mike Johnson' } }
      ]
    },
    {
      data: { name: 'Completed tasks', status: 'status', priority: 'priority', dueDate: 'dueDate', assignee: 'assignee' },
      children: [
        { data: { name: 'Task 1', status: 'Completed', priority: 'Medium', dueDate: '2025-03-10', assignee: 'Jane Smith' } },
        { data: { name: 'Task 2', status: 'Pending', priority: 'Low', dueDate: '2025-03-20', assignee: 'Mike Johnson' } }
      ]
    }
  ];
}
