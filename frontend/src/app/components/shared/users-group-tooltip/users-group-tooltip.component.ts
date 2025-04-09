import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-users-group-tooltip',
  imports: [AvatarModule, AvatarGroupModule, TooltipModule],
  templateUrl: './users-group-tooltip.component.html',
  styleUrl: './users-group-tooltip.component.scss'
})
export class UsersGroupTooltipComponent {
  // @Input()
  // users!: any;

  // public overUsers:number = this.users.length() - 5;

}
