import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-project-form',
  imports: [Dialog, ButtonModule, InputTextModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {

  visible: boolean = false;
  
  showDialog() {
      this.visible = true;
  }

}
