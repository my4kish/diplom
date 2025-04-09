import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Panel } from 'primeng/panel';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    AvatarModule,
    Panel,
    Button,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    SelectModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  public cities!: string[];
  public gender!: string[];
  public isEditing:boolean = false;
  originalValues: any; //Заменить на норматльный интерфейс

  userForm: FormGroup = new FormGroup({
    name: new FormControl('myName', Validators.required),
    email: new FormControl('myEmail@mail.ru', [
      Validators.required,
      Validators.email,
    ]),
    gender: new FormControl(""),
    city: new FormControl(""),
    phone: new FormControl("", Validators.pattern("[0-9]{10}"))
  });

  ngOnInit(): void {
    this.cities = ['Karaganda', 'Astana', 'Almaty'];
    this.gender = ['Мужской', 'Женский'];

    this.userForm.disable();
  }

  public enableEditing():void {
    this.isEditing = true;
    this.originalValues = this.userForm.value;
    this.userForm.enable();
  }

  public cancelEditing():void {
    this.userForm.patchValue(this.originalValues);
    this.userForm.disable();
    this.isEditing = false;
  }

  public onSumbit():void{
    console.log(this.userForm.value);
    this.isEditing = false;
    this.userForm.disable();
  }

}
