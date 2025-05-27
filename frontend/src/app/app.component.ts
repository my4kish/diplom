import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    NotificationsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);

  public showHeader$ = new BehaviorSubject<boolean>(this.authService.isAuth);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      const shouldShow = !(url.startsWith('/login') || url.startsWith('/register'));
      this.showHeader$.next(shouldShow);
    });
  }

  ngOnInit(): void {
    const url = this.router.url;
    if (url === '/main') {
      this.userService.getCurrentUser().subscribe();
    }
    this.initTheme();
  }

  public initTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    const element = document.querySelector('html');
    if (savedTheme === 'dark') {
      element?.classList.add('my-app-dark');
    } else {
      element?.classList.remove('my-app-dark');
    }
  }
}
