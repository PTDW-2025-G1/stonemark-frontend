import { Component, OnInit, signal, ViewChild, OnDestroy } from '@angular/core';
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
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, take } from 'rxjs';
import { DateUtils } from '@shared/utils/date.utils';
import { SortUtils } from '../../../utils/sort.utils';

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
      [globalFilterFields]="['firstName', 'lastName', 'createdAt']"
      [lazy]="true"
      [totalRecords]="totalRecords()"
      [rows]="pageSize()"
      [first]="currentPage() * pageSize()"
      (pageChange)="onPageChange($event)"
      (searchChange)="onSearchChange($event)"
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
export class ManageUsers implements OnInit, OnDestroy {
  users = signal<any[]>([]);
  totalRecords = signal<number>(0);
  currentPage = signal<number>(0);
  pageSize = signal<number>(10);
  private destroy$ = new Subject<void>();

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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const page = params['page'] ? parseInt(params['page']) : 0;
        const size = params['size'] ? parseInt(params['size']) : 10;

        this.currentPage.set(page);
        this.pageSize.set(size);

        this.loadUsers(page, size);
      });
  }

  viewUser(user: UserDto) {
    this.currentUser = user;
    this.detailsDialogVisible = true;
  }

  editUser(user: UserDto) {
    this.router.navigate(['/admin/users/edit', user.id]);
  }

  loadUsers(page: number = 0, size: number = 10, sortField?: string, sortOrder?: number) {
    const sort = SortUtils.buildSortString(sortField, sortOrder);

    this.userManagementService.getAll(page, size, sort)
      .pipe(take(1))
      .subscribe({
        next: (pageData) => {
          const content = pageData.content || [];
          const formattedUsers = content.map(user => {
            return {
              ...user,
              createdAt: DateUtils.formatShortDate(user.createdAt, 'pt-PT')
            };
          });

          this.users.set(formattedUsers);
          this.totalRecords.set(pageData.totalElements || 0);
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

  onPageChange(event: { first: number; rows: number; page: number; sortField?: string; sortOrder?: number }): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: event.page,
        size: event.rows
      },
      queryParamsHandling: 'merge'
    });

    // Reload with sort if provided
    if (event.sortField || event.sortOrder) {
      this.loadUsers(event.page, event.rows, event.sortField, event.sortOrder);
    }
  }

  onSearchChange(searchValue: string): void {
    if (searchValue.length > 0) {
      // Carregar TODOS os dados para pesquisa
      this.loadUsers(0, 10000);
    } else {
      // Voltar para paginação normal
      this.loadUsers(this.currentPage(), this.pageSize());
    }
  }

  exportCSV() {
    this.tableComp?.exportCSV();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
