import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
      [data]="filtered()"
      [columns]="cols"
      [globalFilterFields]="['name', 'email', 'subject', 'status']"
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
export class ContactRequests implements OnInit {

  requests: ContactRequest[] = [];
  filtered = signal<ContactRequest[]>([]);

  statusFilter = signal<ContactStatusFilterValue>('ALL');

  @ViewChild('table') tableComp!: AppTableComponent;

  dialogVisible = false;
  current: ContactRequest | null = null;

  cols = [
    { field: 'name', header: 'Name' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'subject', header: 'Subject' },
    { field: 'status', header: 'Status', type: 'status' },
    { field: 'createdAt', header: 'Created At', type: 'date' }
  ];

  constructor(
    private contactService: ContactService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.contactService.getAll().subscribe({
      next: (data) => {
        this.requests = data.map(item => ({
          ...item,
          createdAt: item.createdAt ? new Date(item.createdAt).toLocaleString('pt-PT') : ''
        }));
        this.applyFilter();
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

  filterByStatus(status: ContactStatusFilterValue) {
    this.statusFilter.set(status);
    this.applyFilter();
  }

  applyFilter() {
    const s = this.statusFilter();

    if (s === 'ALL') {
      this.filtered.set(this.requests);
    } else {
      this.filtered.set(this.requests.filter(r => r.status === s));
    }
  }

  view(item: ContactRequest) {
    this.current = { ...item };
    this.dialogVisible = true;
  }

  updateStatus(item: ContactRequest, newStatus: ContactRequest.StatusEnum) {
    if (!item.id) return;

    this.contactService.updateStatus(item.id, newStatus).subscribe({
      next: (updated) => {
        const index = this.requests.findIndex(r => r.id === item.id);
        if (index !== -1) {
          this.requests[index] = {
            ...updated,
            createdAt: updated.createdAt ? new Date(updated.createdAt).toLocaleString('pt-PT') : ''
          };
          this.applyFilter();
        }

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
}
