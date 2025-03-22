import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { Menu } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Menu, Menubar, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  
  projects = [
    { label: 'аа', icon: 'pi pi-bolt', shortcut: '⌘+S' },
    { label: 'Blocks', icon: 'pi pi-server', shortcut: '⌘+B' },
    { label: 'UI Kit', icon: 'pi pi-pencil', shortcut: '⌘+U' },
    { label: 'bb', icon: 'pi pi-pencil', shortcut: '⌘+U' },
    { label: 'cc', icon: 'pi pi-pencil', shortcut: '⌘+U' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Главная',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/main'])
      },
      {
        label: 'Проекты',
        icon: 'pi pi-search',
        badge: this.projects.length.toString(),
        command: () => this.router.navigate(['/projects'])
      }
    ];
  }
}
