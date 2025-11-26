import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { MarksSubmission, MarksSubmissionService } from '@core/services/marks-submission.service';
import { AppToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { AppDialogComponent } from '../../../components/dialog/dialog.component';
import { AppTableComponent } from '../../../components/table/table.component';
import { StatusFilterComponent } from '../../../components/status-filter/status-filter.component';
import { BaseFilterTableComponent } from '../../../shared/base-filter-table.component';

@Component({
  selector: 'app-moderator-marks-submissions',
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
      title="Marks Submissions"
      subtitle="Manage user marks submissions. Approve or reject as needed."
      (export)="exportCSV()"
    ></app-toolbar>
    <p-toast />
    <p-confirmDialog />
    <app-status-filter [selected]="statusFilter()" (statusChange)="filterByStatus($event)" />
    <app-table #table [data]="filteredItems()" [columns]="columns" [globalFilterFields]="['markName', 'submitter', 'status']">
      <ng-template #actions let-item>
        <p-button icon="pi pi-eye" class="mr-2" (click)="view(item)"></p-button>
        @if (item.status === 'PENDING') {
          <p-button icon="pi pi-check" severity="success" class="mr-2" (click)="confirmAction(item, 'APPROVED')"></p-button>
          <p-button icon="pi pi-times" severity="danger" (click)="confirmAction(item, 'REJECTED')"></p-button>
        }
      </ng-template>
    </app-table>
    <app-dialog
      title="Submission Details"
      [visible]="dialogVisible"
      [data]="current"
      [fields]="[
                { key: 'markName', label: 'Mark' },
                { key: 'submitter', label: 'Submitted by' },
                { key: 'status', label: 'Status', type: 'status' },
                { key: 'description', label: 'Description' },
                { key: 'logo', label: 'Logo', type: 'image' }
            ]"
      (close)="dialogVisible = false"
    ></app-dialog>
  `,
  providers: [MessageService, ConfirmationService, MarksSubmissionService]
})
export class ModeratorMarksSubmissionsComponent
  extends BaseFilterTableComponent<MarksSubmission>
  implements OnInit
{
  current: MarksSubmission | null = null;
  dialogVisible = false;

  @ViewChild('table') tableComp!: AppTableComponent;

  columns = [
    { field: 'markName', header: 'Mark' },
    { field: 'submitter', header: 'Submitted by' },
    { field: 'status', header: 'Status', type: 'status' }
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private marksSubmissionService: MarksSubmissionService
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.initData();
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load submissions.' });
    }
  }

  async loadData() {
    return await this.marksSubmissionService.getSubmissions();
  }

  view(item: MarksSubmission) {
    this.current = { ...item };
    this.dialogVisible = true;
  }

  confirmAction(item: MarksSubmission, status: 'APPROVED' | 'REJECTED') {
    const action = status === 'APPROVED' ? 'approve' : 'reject';
    this.confirmationService.confirm({
      message: `Do you want to ${action} the submission for ${item.markName}?`,
      accept: () => this.updateStatus(item, status)
    });
  }

  async updateStatus(item: MarksSubmission, status: 'APPROVED' | 'REJECTED') {
    try {
      const updated = await this.marksSubmissionService.updateStatus(item.id, status);
      this.updateLocalItem(updated);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Submission for ${item.markName} has been ${status === 'APPROVED' ? 'approved' : 'rejected'}.`
      });
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to update submission status.'
      });
    }
  }

  exportCSV() {
    this.tableComp?.exportCSV();
  }
}
