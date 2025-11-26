import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ContentProposal, ContentProposalService } from '@core/services/content-proposal.service';
import { AppToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { AppDialogComponent } from '../../../components/dialog/dialog.component';
import { AppTableComponent } from '../../../components/table/table.component';
import { StatusFilterComponent } from '../../../components/status-filter/status-filter.component';
import { BaseFilterTableComponent } from '../../../shared/base-filter-table.component';

@Component({
  selector: 'app-content-proposals',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    Toast,
    ConfirmDialog,
    AppToolbarComponent,
    AppDialogComponent,
    AppTableComponent,
    StatusFilterComponent
  ],
  template: `
    <app-toolbar
      title="Content Proposals"
      subtitle="Approve or reject user content change proposals."
      (export)="exportCSV()"
    ></app-toolbar>
    <p-toast />
    <p-confirmDialog />
    <app-status-filter [selected]="statusFilter()" (statusChange)="filterByStatus($event)" />
    <app-table #table [data]="filteredItems()" [columns]="columns" [globalFilterFields]="['type', 'status', 'createdBy']">
      <ng-template #actions let-item>
        <p-button icon="pi pi-eye" class="mr-2" (click)="view(item)"></p-button>
        @if (item.status === 'PENDING') {
          <p-button icon="pi pi-check" severity="success" class="mr-2" (click)="confirmAction(item, 'APPROVED')"></p-button>
          <p-button icon="pi pi-times" severity="danger" (click)="confirmAction(item, 'REJECTED')"></p-button>
        }
      </ng-template>
    </app-table>
    <app-dialog
      title="Proposal Details"
      [visible]="dialogVisible"
      [data]="current"
      [fields]="[
                { key: 'type', label: 'Type' },
                { key: 'status', label: 'Status', type: 'status' },
                { key: 'createdAt', label: 'Created at' },
                { key: 'createdBy', label: 'Created by' },
                { key: 'details', label: 'Change details' }
            ]"
      (close)="dialogVisible = false"
    ></app-dialog>
  `,
  providers: [MessageService, ConfirmationService, ContentProposalService]
})
export class ContentProposals
  extends BaseFilterTableComponent<ContentProposal>
  implements OnInit
{
  current: ContentProposal | null = null;
  dialogVisible = false;

  @ViewChild('table') tableComp!: AppTableComponent;

  columns = [
    { field: 'type', header: 'Type' },
    { field: 'status', header: 'Status', type: 'status' },
    { field: 'createdAt', header: 'Created at' },
    { field: 'createdBy', header: 'Created by' }
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private contentProposalService: ContentProposalService
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.initData();
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load proposals.' });
    }
  }

  async loadData() {
    return await this.contentProposalService.getProposals();
  }

  view(item: ContentProposal) {
    this.current = { ...item };
    this.dialogVisible = true;
  }

  confirmAction(item: ContentProposal, status: 'APPROVED' | 'REJECTED') {
    const action = status === 'APPROVED' ? 'approve' : 'reject';
    this.confirmationService.confirm({
      message: `Do you want to ${action} the proposal for ${item.type}?`,
      accept: () => this.updateStatus(item, status)
    });
  }

  async updateStatus(item: ContentProposal, status: 'APPROVED' | 'REJECTED') {
    try {
      const updated = await this.contentProposalService.updateStatus(item.id, status);
      this.updateLocalItem(updated);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `The proposal for ${item.type} has been ${status === 'APPROVED' ? 'approved' : 'rejected'}.`
      });
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to update proposal status.'
      });
    }
  }

  exportCSV() {
    this.tableComp?.exportCSV();
  }
}
