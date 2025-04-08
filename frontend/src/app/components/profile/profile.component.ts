import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ProfileGeneralComponent } from './profile-general/profile-general.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

@Component({
  selector: 'app-profile',
  imports: [DividerModule, TabsModule, CommonModule, BadgeModule, AvatarModule, ProfileGeneralComponent, ProfileSettingsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {}
