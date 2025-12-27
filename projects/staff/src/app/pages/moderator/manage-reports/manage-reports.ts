import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Tooltip } from 'primeng/tooltip';

import { AppToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { AppTableComponent } from '../../../components/table/table.component';
import { AppDialogComponent } from '../../../components/dialog/dialog.component';

import { StatusFilterComponent, StatusOption } from '../../../components/status-filter/status-filter.component';
import { ReportService } from '@core/services/report/report.service';
import { ReportResponseDto } from '@api/model/report-response-dto';
import { PageReportResponseDto } from '@api/model/page-report-response-dto';

type ReportDisplay = Omit<ReportResponseDto, 'createdById' | 'modifiedById' | 'lastModifiedAt'> & {
  userId?: number;
  createdAt?: string;
  reasonLabel?: string;
  targetTypeLabel?: string;
  lastModifiedAt?: string;
};

@Component({
  selector: 'app-manage-reports',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    Toast,
    AppToolbarComponent,
    AppTableComponent,
    AppDialogComponent,
    StatusFilterComponent,
    Tooltip
  ],
  providers: [MessageService],
  template: `
    <app-toolbar
      title="Manage Reports"
      subtitle="Review and manage user-submitted reports on platform content."
      (export)="exportCsv()"
    />

    <p-toast />

    <app-status-filter
      [selected]="statusFilter()"
      [options]="statusFilterOptions"
      (statusChange)="filterByStatus($event)"
    />

    <app-table
      #table
      [data]="filtered()"
      [columns]="cols"
      [globalFilterFields]="['id', 'targetTypeLabel', 'reasonLabel', 'status', 'description']"
    >
      <ng-template #actions let-item>
        <p-button
          icon="pi pi-eye"
          class="mr-2"
          (click)="view(item)"
          [pTooltip]="'View Details'"
        ></p-button>

        <p-button
          *ngIf="item.status !== ReportResponseDto.StatusEnum.UnderReview"
          icon="pi pi-book"
          severity="info"
          class="mr-2"
          (click)="updateStatus(item, ReportResponseDto.StatusEnum.UnderReview)"
          [pTooltip]="'Mark as Under Review'"
        ></p-button>

        <p-button
          *ngIf="item.status !== ReportResponseDto.StatusEnum.Resolved"
          icon="pi pi-check"
          severity="success"
          class="mr-2"
          (click)="updateStatus(item, ReportResponseDto.StatusEnum.Resolved)"
          [pTooltip]="'Mark as Resolved'"
        ></p-button>

        <p-button
          *ngIf="item.status !== ReportResponseDto.StatusEnum.Rejected"
          icon="pi pi-times"
          severity="danger"
          (click)="updateStatus(item, ReportResponseDto.StatusEnum.Rejected)"
          [pTooltip]="'Reject Report'"
        ></p-button>
      </ng-template>
    </app-table>

    <app-dialog
      title="Report Details"
      [visible]="dialogVisible"
      [data]="current"
      [fields]="[
        { key: 'id', label: 'Report ID' },
        { key: 'targetTypeLabel', label: 'Target Type' },
        { key: 'targetId', label: 'Target ID' },
        { key: 'reasonLabel', label: 'Reason' },
        { key: 'description', label: 'Description', type: 'text' },
        { key: 'status', label: 'Status', type: 'status' },
        { key: 'userId', label: 'Reported By (User ID)' },
        { key: 'createdAt', label: 'Created At', type: 'text' },
        { key: 'modifiedById', label: 'Modified By (User ID)' },
        { key: 'lastModifiedAt', label: 'Modified At', type: 'text' }
      ]"
      (close)="dialogVisible = false"
    />
  `
})
export class ManageReports implements OnInit {

  reports: ReportDisplay[] = [];
  filtered = signal<ReportDisplay[]>([]);

  statusFilter = signal<string>('ALL');

  statusFilterOptions: StatusOption[] = [
    { label: 'All', value: 'ALL' },
    { label: 'Pending', value: ReportResponseDto.StatusEnum.Pending },
    { label: 'Under Review', value: ReportResponseDto.StatusEnum.UnderReview },
    { label: 'Resolved', value: ReportResponseDto.StatusEnum.Resolved },
    { label: 'Rejected', value: ReportResponseDto.StatusEnum.Rejected }
  ];

  @ViewChild('table') tableComp!: AppTableComponent;

  dialogVisible = false;
  current: ReportDisplay | null = null;

  cols = [
    { field: 'id', header: 'ID' },
    { field: 'targetTypeLabel', header: 'Target Type' },
    { field: 'targetId', header: 'Target ID' },
    { field: 'reasonLabel', header: 'Reason' },
    { field: 'status', header: 'Status', type: 'status' },
    { field: 'createdAt', header: 'Created At', type: 'date' },
    { field: 'lastModifiedAt', header: 'Modified At', type: 'date' }
  ];

  constructor(
    private reportService: ReportService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.reportService.getAllReports(0, 100).subscribe({
      next: (page: PageReportResponseDto) => {
        this.reports = (page.content || []).map(item => ({
          ...item,
          userId: item.createdById,
          createdAt: item.createdAt ? new Date(item.createdAt).toLocaleString('pt-PT') : '',
          reasonLabel: this.formatReason(item.reason),
          targetTypeLabel: this.formatTargetType(item.targetType),
          lastModifiedAt: item.lastModifiedAt ? new Date(item.lastModifiedAt).toLocaleString('pt-PT') : ''
        }));
        this.applyFilter();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load reports.'
        });
        console.error('Error loading reports:', err);
      }
    });
  }

  filterByStatus(status: string) {
    this.statusFilter.set(status);
    this.applyFilter();
  }

  applyFilter() {
    const s = this.statusFilter();
    if (s === 'ALL') {
      this.filtered.set(this.reports);
    } else {
      this.filtered.set(this.reports.filter(r => r.status === s));
    }
  }

  view(item: ReportDisplay) {
    this.current = { ...item };
    this.dialogVisible = true;
  }

  updateStatus(item: ReportDisplay, newStatus: ReportResponseDto.StatusEnum) {
    if (!item.id) return;

    this.reportService.updateStatus(item.id, newStatus).subscribe({
      next: (updated) => {
        const index = this.reports.findIndex(r => r.id === item.id);
        if (index !== -1) {
          this.reports[index] = {
            ...updated,
            userId: updated.createdById,
            createdAt: updated.createdAt ? new Date(updated.createdAt).toLocaleString('pt-PT') : '',
            reasonLabel: this.formatReason(updated.reason),
            targetTypeLabel: this.formatTargetType(updated.targetType),
            lastModifiedAt: updated.lastModifiedAt ? new Date(updated.lastModifiedAt).toLocaleString('pt-PT') : ''
          };
          this.applyFilter();
        }

        const statusLabels: Record<ReportResponseDto.StatusEnum, string> = {
          [ReportResponseDto.StatusEnum.Pending]: 'Pending',
          [ReportResponseDto.StatusEnum.UnderReview]: 'Under Review',
          [ReportResponseDto.StatusEnum.Resolved]: 'Resolved',
          [ReportResponseDto.StatusEnum.Rejected]: 'Rejected'
        };

        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: `Report marked as ${statusLabels[newStatus]}.`
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update report status.'
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

  private formatReason(reason?: ReportResponseDto.ReasonEnum): string {
    if (!reason) return '';
    const reasonLabels: Record<string, string> = {
      'INCORRECT_INFORMATION': 'Incorrect Information',
      'WRONG_LOCATION': 'Wrong Location',
      'DUPLICATE': 'Duplicate',
      'DAMAGED_MARK': 'Damaged Mark',
      'INAPPROPRIATE_CONTENT': 'Inappropriate Content',
      'OTHER': 'Other'
    };
    return reasonLabels[reason] || reason;
  }

  private formatTargetType(targetType?: ReportResponseDto.TargetTypeEnum): string {
    if (!targetType) return '';
    const typeLabels: Record<string, string> = {
      'MONUMENT': 'Monument',
      'MARK': 'Mark',
      'MARK_OCCURRENCE': 'Mark Occurrence',
      'USER': 'User',
      'PROPOSAL': 'Proposal'
    };
    return typeLabels[targetType] || targetType;
  }

  protected readonly ReportResponseDto = ReportResponseDto;
}
