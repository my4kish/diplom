import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private sidebarVisible = new BehaviorSubject<boolean>(false);
  public sidebarVisibility$ = this.sidebarVisible.asObservable();

  toggleSidebar(): void {
    this.sidebarVisible.next(!this.sidebarVisible.value);
  }

  closeSidebar(): void {
    this.sidebarVisible.next(false);
  }

  

}
