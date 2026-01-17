import { Component, OnInit, ViewChild, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AppToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { AppTableComponent } from '../../../components/table/table.component';
import { AppDialogComponent } from '../../../components/dialog/dialog.component';

import { StatusFilterContactComponent, ContactStatusFilterValue }
  from '../../../components/contact-status/status-filter-contact.component';

import { ContactService } from '@core/services/contact/contact.service';
import { ContactRequest } from '@api/model/contact-request';
import {Tooltip} from 'primeng/tooltip';
import { Subject, takeUntil, take } from 'rxjs';
import { DateUtils } from '@shared/utils/date.utils';
import { SortUtils } from '../../../utils/sort.utils';

@Component({
  selector: 'app-contact-requests',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    Toast,
    AppToolbarComponent,
    AppTableComponent,
    AppDialogComponent,
    StatusFilterContactComponent,
    Tooltip
  ],
  providers: [MessageService, ContactService],
  template: `
    <app-toolbar
      title="Contact Requests"
      subtitle="Manage contact requests submitted by users."
      (export)="exportCsv()"
    />

    <p-toast />

    <app-status-filter-contact
      [selected]="statusFilter()"
      (statusChange)="filterByStatus($event)"
    />

    <app-table
      #table
      [data]="requests()"
      [columns]="cols"
      [globalFilterFields]="['name', 'createdAt']"
      [lazy]="true"
      [totalRecords]="totalRecords()"
      [rows]="pageSize()"
      [first]="currentPage() * pageSize()"
      (pageChange)="onPageChange($event)"
      (searchChange)="onSearchChange($event)"
    >
      <ng-template #actions let-item>
        <p-button
          icon="pi pi-eye"
          class="mr-2"
          (click)="view(item)"
          [pTooltip]="'View Details'"
        ></p-button>

        <p-button
          *ngIf="item.status !== 'IN_REVIEW'"
          icon="pi pi-book"
          severity="info"
          class="mr-2"
          (click)="updateStatus(item, 'IN_REVIEW')"
          [pTooltip]="'Mark as In Review'"
        ></p-button>

        <p-button
          *ngIf="item.status !== 'RESOLVED'"
          icon="pi pi-check"
          severity="success"
          class="mr-2"
          (click)="updateStatus(item, 'RESOLVED')"
          [pTooltip]="'Mark as Resolved'"
        ></p-button>

        <p-button
          *ngIf="item.status !== 'ARCHIVED'"
          icon="pi pi-inbox"
          severity="secondary"
          (click)="updateStatus(item, 'ARCHIVED')"
          [pTooltip]="'Archive'"
        ></p-button>
      </ng-template>

    </app-table>

    <app-dialog
      title="Request Details"
      [visible]="dialogVisible"
      [data]="current"
      [fields]="[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'subject', label: 'Subject' },
        { key: 'status', label: 'Status', type: 'status' },
        { key: 'createdAt', label: 'Created At', type: 'text' },
        { key: 'message', label: 'Message', type: 'text' }
      ]"
      (close)="dialogVisible = false"
    />
  `
})
export class ContactRequests implements OnInit, OnDestroy {

  requests = signal<ContactRequest[]>([]);
  totalRecords = signal<number>(0);
  currentPage = signal<number>(0);
  pageSize = signal<number>(10);
  statusFilter = signal<ContactStatusFilterValue>('ALL');
  private destroy$ = new Subject<void>();

  @ViewChild('table') tableComp!: AppTableComponent;

  dialogVisible = false;
  current: ContactRequest | null = null;

  cols = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'subject', header: 'Subject' },
    { field: 'status', header: 'Status', type: 'status' },
    { field: 'createdAt', header: 'Created At', type: 'date' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const page = params['page'] ? parseInt(params['page']) : 0;
        const size = params['size'] ? parseInt(params['size']) : 10;
        const status = params['status'] || 'ALL';

        this.currentPage.set(page);
        this.pageSize.set(size);
        this.statusFilter.set(status as ContactStatusFilterValue);

        this.loadRequests(page, size);
      });
  }

  loadRequests(page: number = 0, size: number = 10, sortField?: string, sortOrder?: number): void {
    const sort = SortUtils.buildSortString(sortField, sortOrder);

    this.contactService.getAll(page, size, sort)
      .pipe(take(1))
      .subscribe({
        next: (pageData) => {
          const content = pageData.content || [];
          const formatted = content.map(item => ({
            ...item,
            createdAt: DateUtils.formatShortDate(item.createdAt, 'pt-PT')
          }));

          // Apply status filter client-side
          const statusFilterValue = this.statusFilter();
          const filteredData = statusFilterValue === 'ALL'
            ? formatted
            : formatted.filter(r => r.status === statusFilterValue);

          this.requests.set(filteredData);
          // Update totalRecords based on filtered data when using client-side filter
          this.totalRecords.set(statusFilterValue === 'ALL' ? (pageData.totalElements || 0) : filteredData.length);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load contact requests.'
          });
          console.error('Error loading contact requests:', err);
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
      this.loadRequests(event.page, event.rows, event.sortField, event.sortOrder);
    }
  }

  onSearchChange(searchValue: string): void {
    if (searchValue.length > 0) {
      // Carregar TODOS os dados para pesquisa
      this.loadRequests(0, 10000);
    } else {
      // Voltar para paginação normal
      this.loadRequests(this.currentPage(), this.pageSize());
    }
  }

  filterByStatus(status: ContactStatusFilterValue) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        status,
        page: 0 // Reset to first page when filtering
      },
      queryParamsHandling: 'merge'
    });
  }

  view(item: ContactRequest) {
    this.current = { ...item };
    this.dialogVisible = true;
  }

  updateStatus(item: ContactRequest, newStatus: ContactRequest.StatusEnum) {
    if (!item.id) return;

    this.contactService.updateStatus(item.id, newStatus)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loadRequests(this.currentPage(), this.pageSize());

          const statusLabels: Record<ContactRequest.StatusEnum, string> = {
            [ContactRequest.StatusEnum.Pending]: 'Pending',
            [ContactRequest.StatusEnum.InReview]: 'In Review',
            [ContactRequest.StatusEnum.Resolved]: 'Resolved',
            [ContactRequest.StatusEnum.Archived]: 'Archived'
          };

          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: `Request marked as ${statusLabels[newStatus]}.`
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update request status.'
          });
          console.error('Error updating status:', err);
        }
      });
  }

  exportCsv() {
    if (this.tableComp) {
      this.tableComp.exportCSV();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
