import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService } from '@core/services/user/user-management.service';
import { UserDto } from '@api/model/user-dto';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Select } from 'primeng/select';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { DividerModule } from 'primeng/divider';
import { UserContactsComponent } from './user-contacts/user-contacts.component';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToastModule,
    AutoCompleteModule,
    Select,
    ToggleSwitch,
    DividerModule,
    UserContactsComponent
  ],
  templateUrl: './edit-user.html',
  styleUrls: ['./edit-user.scss'],
  providers: [MessageService]
})
export class EditUserComponent implements OnInit {
  user: UserDto | null = null;
  userId: number | null = null;
  selectedRole: any = null;
  filteredRoles: any[] = [];

  roleOptions = Object.entries(UserDto.RoleEnum).map(([label, value]) => ({ label, value }));
  tfaMethodOptions = Object.entries(UserDto.TfaMethodEnum).map(([label, value]) => ({ label, value }));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userManagementService: UserManagementService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    if (this.userId) {
      this.loadUser();
    }
    this.filteredRoles = this.roleOptions;
  }

  loadUser(): void {
    this.userManagementService.getById(this.userId!).subscribe({
      next: (user) => {
        this.user = user;
        this.selectedRole = this.roleOptions.find(r => r.value === user.role) ?? null;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not load user data.'
        });
      }
    });
  }

  saveUser(): void {
    if (this.user) {
      this.userManagementService.update(this.user.id!, this.user).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User updated successfully.'
          });
          this.router.navigate(['/admin/users']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not update user.'
          });
        }
      });
    }
  }

  saveRole(): void {
    if (!this.user?.id) return;

    let roleValue: UserDto.RoleEnum | undefined;

    if (typeof this.selectedRole === 'string') {
      const role = this.roleOptions.find(
        r => r.label === this.selectedRole || r.value === this.selectedRole
      );
      if (role) {
        roleValue = role.value as UserDto.RoleEnum;
      }
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
      .updateRole(this.user.id, roleValue)
      .subscribe({
        next: (updatedUser) => {
          if (this.user) {
            this.user.role = updatedUser.role;
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Role changed to ${roleValue}`
          });
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

  filterRoles(event: any) {
    const query = event.query.toLowerCase();
    this.filteredRoles = this.roleOptions.filter(role =>
      role.label.toLowerCase().includes(query)
    );
  }

  cancel(): void {
    this.router.navigate(['/admin/users']);
  }
}
