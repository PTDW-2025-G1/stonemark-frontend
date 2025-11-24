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

import { ContactRequest, ContactService } from '../../../services/contact.service';

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
    StatusFilterContactComponent
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
        ></p-button>

        <p-button
          *ngIf="item.status === 'PENDING'"
          icon="pi pi-check"
          severity="info"
          label="Mark as Read"
          (click)="markAsRead(item)"
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
    { field: 'email', header: 'Email' },
    { field: 'subject', header: 'Subject' },
    { field: 'status', header: 'Status', type: 'status' },
    { field: 'createdAt', header: 'Created At', type: 'date' }
  ];

  constructor(
    private contactService: ContactService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    this.requests = await this.contactService.getAll();
    this.applyFilter();
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

  markAsRead(item: ContactRequest) {
    item.status = 'READ';

    this.messageService.add({
      severity: 'success',
      summary: 'Updated',
      detail: `The request from ${item.name} has been marked as read.`
    });

    this.applyFilter();
  }

  exportCsv() {
    if (this.tableComp) {
      this.tableComp.exportCSV();
    }
  }
}
