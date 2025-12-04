import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Dialog } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { UserManagementService } from '@core/services/user/user-management.service';
import { UserDto } from '@api/model/user-dto';
import { AppToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { AppTableComponent } from '../../../components/table/table.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, Toast, Dialog, AutoCompleteModule, ButtonModule, FormsModule, AppToolbarComponent, AppTableComponent],
  template: `
    <app-toolbar title="Manage User's" subtitle="Here you can manage the user list of StoneMark" (export)="exportCSV()"></app-toolbar>
    <p-toast />

    <app-table #table [data]="users()" [columns]="cols" [globalFilterFields]="['id', 'firstName', 'lastName', 'email', 'role']">
      <ng-template #actions let-user>
        <p-button
          label="Change Role"
          icon="pi pi-user-edit"
          severity="info"
          (onClick)="openRoleDialog(user)"
        ></p-button>
      </ng-template>
    </app-table>

    <p-dialog
      [(visible)]="displayDialog"
      [header]="'Change role of ' + selectedUser?.firstName + ' ' + selectedUser?.lastName"
      [modal]="true"
      [style]="{ width: '90vw', maxWidth: '500px' }"
      [contentStyle]="{ overflow: 'visible' }"
      (onHide)="closeDialog()"
    >
      <div class="flex flex-column gap-3 pt-3">
        <div class="flex flex-column gap-2">
          <p-autocomplete
            id="role"
            [(ngModel)]="selectedRole"
            [suggestions]="filteredRoles"
            (completeMethod)="filterRoles($event)"
            field="label"
            [dropdown]="true"
            placeholder="Select a Role"
            appendTo="body"
            styleClass="w-full"
          ></p-autocomplete>
        </div>
      </div>

      <ng-template #footer>
        <p-button
          label="Cancel"
          icon="pi pi-times"
          (onClick)="closeDialog()"
          severity="secondary"
        ></p-button>
        <p-button
          label="Save"
          icon="pi pi-check"
          (onClick)="saveRole()"
          [disabled]="!selectedRole"
        ></p-button>
      </ng-template>
    </p-dialog>
  `,
  providers: [MessageService]
})
export class ManageUsers implements OnInit {
  users = signal<UserDto[]>([]);
  @ViewChild('table') tableComp!: AppTableComponent;

  displayDialog = false;
  selectedUser: UserDto | null = null;
  selectedRole: any = null;
  filteredRoles: any[] = [];

  roleOptions = [
    { label: 'User', value: 'USER' },
    { label: 'Moderator', value: 'MODERATOR' },
    { label: 'Administrator', value: 'ADMIN' }
  ];

  cols = [
    { field: 'id', header: 'ID' },
    { field: 'firstName', header: 'First Name' },
    { field: 'lastName', header: 'Last Name' },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' },
    { field: 'createdAt', header: 'Created At' }
  ];

  constructor(
    private userManagementService: UserManagementService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userManagementService.getAll(0, 100).subscribe({
      next: (page) => {
        const formattedUsers = (page.content || []).map(user => ({
          ...user,
          createdAt: user.createdAt ? new Date(user.createdAt).toLocaleString('pt-PT') : ''
        }));
        this.users.set(formattedUsers);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'It was not possible to load the users'
        });
      }
    });
  }

  filterRoles(event: any) {
    const query = event.query.toLowerCase();
    this.filteredRoles = this.roleOptions.filter(role =>
      role.label.toLowerCase().includes(query)
    );
  }

  openRoleDialog(user: UserDto) {
    this.selectedUser = user;
    const currentRole = this.roleOptions.find(r => r.value === user.role);
    this.selectedRole = currentRole || null;
    this.filteredRoles = this.roleOptions;
    this.displayDialog = true;
  }

  closeDialog() {
    this.displayDialog = false;
    this.selectedUser = null;
    this.selectedRole = null;
    this.filteredRoles = [];
  }

  saveRole() {
    if (!this.selectedUser?.id || !this.selectedRole) return;

    const newRoleValue = typeof this.selectedRole === 'string'
      ? this.selectedRole
      : this.selectedRole.value;

    this.userManagementService.updateRole(this.selectedUser.id, newRoleValue)
      .subscribe({
        next: (updatedUser) => {
          const formattedUser = {
            ...updatedUser,
            createdAt: updatedUser.createdAt ? new Date(updatedUser.createdAt).toLocaleString('pt-PT') : ''
          };
          const list = this.users().map(u => u.id === formattedUser.id ? formattedUser : u);
          this.users.set(list);

          const roleLabel = this.roleOptions.find(r => r.value === newRoleValue)?.label || newRoleValue;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Role changed for ${roleLabel}`
          });
          this.closeDialog();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'It was not possible to change the role'
          });
        }
      });
  }

  exportCSV() {
    this.tableComp?.exportCSV();
  }
}
