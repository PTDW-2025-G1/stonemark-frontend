import { Component, OnInit, ViewChild, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Tooltip } from 'primeng/tooltip';

import { AppToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { AppTableComponent } from '../../../components/table/table.component';
import { AppDialogComponent } from '../../../components/dialog/dialog.component';

import { StatusFilterComponent, StatusOption } from '../../../components/status-filter/status-filter.component';
import { ReportResponseDto } from '@api/model/report-response-dto';
import { PageReportResponseDto } from '@api/model/page-report-response-dto';
import { Subject, takeUntil, take } from 'rxjs';
import { DateUtils } from '@shared/utils/date.utils';
import { SortUtils } from '../../../utils/sort.utils';
import {AdminReportService} from '@core/services/report/admin-report.service';

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
      [data]="reports()"
      [columns]="cols"
      [globalFilterFields]="['createdAt']"
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
export class ManageReports implements OnInit, OnDestroy {

  reports = signal<ReportDisplay[]>([]);
  totalRecords = signal<number>(0);
  currentPage = signal<number>(0);
  pageSize = signal<number>(10);
  statusFilter = signal<string>('ALL');
  private destroy$ = new Subject<void>();

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
    private router: Router,
    private route: ActivatedRoute,
    private reportService: AdminReportService,
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
        this.statusFilter.set(status);

        this.loadReports(page, size);
      });
  }

  loadReports(page: number = 0, size: number = 10, sortField?: string, sortOrder?: number): void {
    const sort = SortUtils.buildSortString(sortField, sortOrder);

    this.reportService.getAllReports(page, size, sort)
      .pipe(take(1))
      .subscribe({
        next: (pageData: PageReportResponseDto) => {
          const content = pageData.content || [];
          const formatted = content.map(item => ({
            ...item,
            userId: item.createdById,
            createdAt: DateUtils.formatShortDate(item.createdAt, 'pt-PT'),
            reasonLabel: this.formatReason(item.reason),
            targetTypeLabel: this.formatTargetType(item.targetType),
            lastModifiedAt: DateUtils.formatShortDate(item.lastModifiedAt, 'pt-PT')
          }));

          // Apply status filter client-side
          const statusFilterValue = this.statusFilter();
          const filteredData = statusFilterValue === 'ALL'
            ? formatted
            : formatted.filter(r => r.status === statusFilterValue);

          this.reports.set(filteredData);
          // Update totalRecords based on filtered data when using client-side filter
          this.totalRecords.set(statusFilterValue === 'ALL' ? (pageData.totalElements || 0) : filteredData.length);
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
      this.loadReports(event.page, event.rows, event.sortField, event.sortOrder);
    }
  }

  onSearchChange(searchValue: string): void {
    if (searchValue.length > 0) {
      // Carregar TODOS os dados para pesquisa
      this.loadReports(0, 10000);
    } else {
      // Voltar para paginação normal
      this.loadReports(this.currentPage(), this.pageSize());
    }
  }

  filterByStatus(status: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        status,
        page: 0
      },
      queryParamsHandling: 'merge'
    });
  }

  view(item: ReportDisplay) {
    this.current = { ...item };
    this.dialogVisible = true;
  }

  updateStatus(item: ReportDisplay, newStatus: ReportResponseDto.StatusEnum) {
    if (!item.id) return;

    this.reportService.updateStatus(item.id, newStatus)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loadReports(this.currentPage(), this.pageSize());

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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected readonly ReportResponseDto = ReportResponseDto;
}
