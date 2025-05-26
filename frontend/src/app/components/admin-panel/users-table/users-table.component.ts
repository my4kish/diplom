import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/models/user.model';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { UserService } from '../../../services/user.service';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    TagModule,
    DropdownModule,
    InputTextModule,
    IconField,
    InputIcon,
  ],
  providers: [ConfirmationService],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent {
  @Input() users: User[] = [];
  selectedUsers: User[] = [];
  searchValue: string = '';

  editUser: User | null = null;
  editedRole: User['role'] = undefined;
  editedPosition: string = '';

  readonly roleOptions = [
    { label: 'Super Admin', value: 'superadmin' },
    { label: 'Org Admin', value: 'orgadmin' },
    { label: 'Project Admin', value: 'projectadmin' },
    { label: 'Power User', value: 'poweruser' },
    { label: 'User', value: 'user' },
  ];

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService
  ) {}

  onEditInit(user: User): void {
    this.editUser = { ...user }; // клон для редактирования
    this.editedRole = user.role ?? undefined;
    this.editedPosition = user.position ?? '';
  }

  onSave(user: User): void {
    this.userService
      .updateUserData(user.id, {
        role: this.editedRole,
        position: this.editedPosition,
      })
      .subscribe((updated) => {
        const index = this.users.findIndex((u) => u.id === updated.id);
        if (index !== -1) {
          this.users[index] = updated;
        }
        this.editUser = null;
      });
  }

  onCancel(): void {
    this.editUser = null;
  }

  confirmDelete(user: User): void {
    this.confirmationService.confirm({
      message: `Пайдаланушыны өшіргіңіз келе ме? (${user.firstName} ${user.lastName})`,
      header: 'Құптау',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Иә',
      rejectLabel: 'Жоқ',
      accept: () => {
        this.userService.deleteUser(user.id).subscribe(() => {
          this.users = this.users.filter((u) => u.id !== user.id);
        });
      },
    });
  }

  clear(table: any) {
    this.searchValue = '';
    table.clear();
  }
}
