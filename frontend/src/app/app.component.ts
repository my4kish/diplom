import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
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
