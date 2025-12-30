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
import { AppDialogComponent } from '../../../components/dialog/dialog.component';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    CommonModule,
    Toast,
    Dialog,
    AutoCompleteModule,
    ButtonModule,
    FormsModule,
    AppToolbarComponent,
    AppTableComponent,
    AppDialogComponent,
    AutoCompleteModule
  ],
  template: `
    <app-toolbar
      title="Manage Users"
      subtitle="Here you can manage the user list of StoneMark"
      (export)="exportCSV()"
    ></app-toolbar>

    <p-toast />

    <app-table
      #table
      [data]="users()"
      [columns]="cols"
      [globalFilterFields]="[
        'id',
        'firstName',
        'lastName',
        'username',
        'role'
      ]"
    >
      <ng-template #actions let-user>
        <p-button icon="pi pi-eye" class="mr-2" (click)="viewUser(user)"></p-button>
        <p-button
          label="Change Role"
          icon="pi pi-user-edit"
          severity="info"
          (onClick)="openRoleDialog(user)"
        ></p-button>
      </ng-template>
    </app-table>

    <app-dialog
      title="User Details"
      [visible]="detailsDialogVisible"
      [data]="currentUser"
      [fields]="[
                { key: 'id', label: 'ID' },
                { key: 'firstName', label: 'First Name' },
                { key: 'lastName', label: 'Last Name' },
                { key: 'username', label: 'Username' },
                { key: 'role', label: 'Role' },
                { key: 'accountLocked', label: 'Account Locked' },
                { key: 'enabled', label: 'Enabled' },
                { key: 'tfaMethod', label: 'TFA Method' },
                { key: 'createdAt', label: 'Created At' }
            ]"
      (close)="detailsDialogVisible = false"
    ></app-dialog>

    <p-dialog
      [(visible)]="displayDialog"
      [header]="'Change role of ' + selectedUser?.firstName + ' ' + selectedUser?.lastName"
      [modal]="true"
      [style]="{ width: '90vw', maxWidth: '500px' }"
      (onHide)="closeDialog()"
    >
      <div class="flex flex-column gap-3 pt-3">
        <p-autocomplete
          [(ngModel)]="selectedRole"
          [suggestions]="filteredRoles"
          (completeMethod)="filterRoles($event)"
          field="label"
          [dropdown]="true"
          placeholder="Select a role"
          appendTo="body"
          class="w-full"
        ></p-autocomplete>
      </div>

      <ng-template #footer>
        <p-button
          label="Cancel"
          icon="pi pi-times"
          severity="secondary"
          (onClick)="closeDialog()"
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
  users = signal<any[]>([]);
  @ViewChild('table') tableComp!: AppTableComponent;

  displayDialog = false;
  detailsDialogVisible = false;
  selectedUser: UserDto | null = null;
  currentUser: UserDto | null = null;
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
    { field: 'username', header: 'Username' },
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

  viewUser(user: UserDto) {
    this.currentUser = user;
    this.detailsDialogVisible = true;
  }

  loadUsers() {
    this.userManagementService.getAll(0, 100).subscribe({
      next: (page) => {
        const formattedUsers = (page.content || []).map(user => {
          return {
            ...user,
            createdAt: user.createdAt
              ? new Date(user.createdAt).toLocaleString('pt-PT')
              : ''
          };
        });

        this.users.set(formattedUsers);
      },
      error: () => {
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

  openRoleDialog(user: any) {
    this.selectedUser = user;
    this.selectedRole =
      this.roleOptions.find(r => r.value === user.role) ?? null;
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
    if (!this.selectedUser?.id) return;

    let roleValue: string | undefined;

    if (typeof this.selectedRole === 'string') {
      roleValue = this.roleOptions.find(
        r => r.label === this.selectedRole || r.value === this.selectedRole
      )?.value;
    } else if (this.selectedRole?.value) {
      roleValue = this.selectedRole.value;
    }

    if (!roleValue) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid role',
        detail: 'Please select a role from the list'
      });
      return;
    }

    this.userManagementService
      .updateRole(this.selectedUser.id, roleValue)
      .subscribe({
        next: (updatedUser) => {
          this.users.set(
            this.users().map(u =>
              u.id === updatedUser.id
                ? { ...u, role: updatedUser.role }
                : u
            )
          );

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Role changed to ${roleValue}`
          });

          this.closeDialog();
        },
        error: () => {
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
