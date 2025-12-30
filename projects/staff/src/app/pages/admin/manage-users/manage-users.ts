import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { UserManagementService } from '@core/services/user/user-management.service';
import { UserDto } from '@api/model/user-dto';
import { AppToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { AppTableComponent } from '../../../components/table/table.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AppDialogComponent } from '../../../components/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    CommonModule,
    Toast,
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
        <p-button icon="pi pi-pencil" class="mr-2" (click)="editUser(user)"></p-button>
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
  `,
  providers: [MessageService]
})
export class ManageUsers implements OnInit {
  users = signal<any[]>([]);
  @ViewChild('table') tableComp!: AppTableComponent;

  detailsDialogVisible = false;
  currentUser: UserDto | null = null;

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
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  viewUser(user: UserDto) {
    this.currentUser = user;
    this.detailsDialogVisible = true;
  }

  editUser(user: UserDto) {
    this.router.navigate(['/admin/users/edit', user.id]);
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

  exportCSV() {
    this.tableComp?.exportCSV();
  }
}
