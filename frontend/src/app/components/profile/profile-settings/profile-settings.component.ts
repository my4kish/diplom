import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-profile-settings',
  imports: [PanelModule],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSettingsComponent {

}
