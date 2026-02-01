import { Component, OnInit, ViewChild, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { MarkOccurrenceProposalModerationService } from '@core/services/proposal/mark-occurrence/mark-occurrence-proposal-moderation.service';
import { ProposalModeratorViewDto } from '@api/model/proposal-moderator-view-dto';
import { ManualDecisionRequest } from '@api/model/manual-decision-request';
import { AppToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { AppTableComponent } from '../../../components/table/table.component';
import { StatusFilterComponent } from '../../../components/status-filter/status-filter.component';
import { Subject, takeUntil, take } from 'rxjs';
import { ProposalModeratorListDto } from '@api/model/proposal-moderator-list-dto';
import type { StatusFilterValue } from '../../../components/status-filter/status-filter.component';
import { DateUtils } from '@shared/utils/date.utils';
import { SortUtils } from '../../../utils/sort.utils';

@Component({
  selector: 'app-content-proposals',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    Toast,
    ConfirmDialog,
    AppToolbarComponent,
    AppTableComponent,
    StatusFilterComponent
  ],
  template: `
    <app-toolbar
      title="Mark Occurrence Proposals"
      subtitle="Review and moderate mark occurrence proposals submitted by users."
      (export)="exportCSV()"
    ></app-toolbar>
    <p-toast />
    <p-confirmDialog />
    <app-status-filter
      [selected]="statusFilter()"
      [options]="statusOptions"
      (statusChange)="filterByStatus($event)" />
    <app-table
      #table
      [data]="proposals()"
      [columns]="columns"
      [globalFilterFields]="['monumentName', 'submittedAt']"
      [lazy]="true"
      [totalRecords]="totalRecords()"
      [rows]="pageSize()"
      [first]="currentPage() * pageSize()"
      (pageChange)="onPageChange($event)"
      (searchChange)="onSearchChange($event)"
      (rowClick)="viewDetails($event)">
      <ng-template #actions let-item>
        <p-button
          icon="pi pi-eye"
          class="mr-2"
          (click)="viewDetails(item); $event.stopPropagation()">
        </p-button>
        @if (item.status === 'SUBMITTED' || item.status === 'UNDER_REVIEW') {
          <p-button
            icon="pi pi-check"
            severity="success"
            class="mr-2"
            (click)="confirmAction(item, 'ACCEPT'); $event.stopPropagation()">
          </p-button>
          <p-button
            icon="pi pi-times"
            severity="danger"
            (click)="confirmAction(item, 'REJECT'); $event.stopPropagation()">
          </p-button>
        }
      </ng-template>
    </app-table>
  `,
  providers: [MessageService, ConfirmationService]
})
export class ContentProposals implements OnInit, OnDestroy {
  @ViewChild('table') tableComp!: AppTableComponent;

  proposals = signal<ProposalModeratorListDto[]>([]);
  totalRecords = signal<number>(0);
  currentPage = signal<number>(0);
  pageSize = signal<number>(10);
  statusFilter = signal<StatusFilterValue>('ALL');
  private destroy$ = new Subject<void>();

  statusOptions = [
    { label: 'All', value: 'ALL' },
    { label: 'Submitted', value: 'SUBMITTED' },
    { label: 'Under Review', value: 'UNDER_REVIEW' },
    { label: 'Manually Accepted', value: 'MANUALLY_ACCEPTED' },
    { label: 'Manually Rejected', value: 'MANUALLY_REJECTED' },
    { label: 'Auto Accepted', value: 'AUTO_ACCEPTED' },
    { label: 'Auto Rejected', value: 'AUTO_REJECTED' },
    { label: 'Inconclusive', value: 'INCONCLUSIVE' }
  ];

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'monumentName', header: 'Monument' },
    { field: 'status', header: 'Status', type: 'status' },
    { field: 'priority', header: 'Priority' },
    { field: 'submissionSource', header: 'Source' },
    { field: 'submittedAt', header: 'Submitted at' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private moderationService: MarkOccurrenceProposalModerationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const page = params['page'] ? parseInt(params['page']) : 0;
        const size = params['size'] ? parseInt(params['size']) : 10;
        const status = params['status'] || 'ALL';

        this.currentPage.set(page);
        this.pageSize.set(size);
        this.statusFilter.set(status as StatusFilterValue);

        this.loadProposals(page, size, status);
      });
  }

  loadProposals(page: number = 0, size: number = 10, statusFilter: string = 'ALL', sortField?: string, sortOrder?: number): void {
    const statusArray = statusFilter !== 'ALL' ? [statusFilter] : undefined;
    const sort = SortUtils.buildSortString(sortField, sortOrder);

    this.moderationService.getAllProposals(page, size, statusArray, sort)
      .pipe(take(1))
      .subscribe({
        next: (pageData) => {
          const content = pageData.content || [];
          const formatted = content.map(item => ({
            ...item,
            submittedAt: DateUtils.formatShortDate(item.submittedAt, 'pt-PT')
          }));

          this.proposals.set(formatted);
          this.totalRecords.set(pageData.totalElements || 0);
        },
        error: (error) => {
          console.error('Error loading proposals:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load proposals.'
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
      this.loadProposals(event.page, event.rows, this.statusFilter(), event.sortField, event.sortOrder);
    }
  }

  onSearchChange(searchValue: string): void {
    if (searchValue.length > 0) {
      // Carregar TODOS os dados para pesquisa
      this.loadProposals(0, 10000, this.statusFilter());
    } else {
      // Voltar para paginação normal
      this.loadProposals(this.currentPage(), this.pageSize(), this.statusFilter());
    }
  }

  filterByStatus(status: StatusFilterValue): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        status,
        page: 0 // Reset to first page when filtering
      },
      queryParamsHandling: 'merge'
    });
  }

  viewDetails(item: ProposalModeratorViewDto) {
    if (item.id) {
      this.router.navigate(['/moderator/content-proposals', item.id]);
    }
  }

  confirmAction(item: ProposalModeratorViewDto, outcome: ManualDecisionRequest.OutcomeEnum) {
    const action = outcome === 'ACCEPT' ? 'accept' : 'reject';
    this.confirmationService.confirm({
      message: `Do you want to ${action} the proposal for ${item.monumentName || 'this monument'}?`,
      accept: () => this.createManualDecision(item, outcome)
    });
  }

  async createManualDecision(item: ProposalModeratorViewDto, outcome: ManualDecisionRequest.OutcomeEnum) {
    if (!item.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid proposal ID.'
      });
      return;
    }

    try {
      const request: ManualDecisionRequest = {
        outcome: outcome,
        notes: undefined
      };

      this.moderationService.createManualDecision(item.id, request)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.loadProposals(this.currentPage(), this.pageSize(), this.statusFilter());

            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `The proposal has been ${outcome === 'ACCEPT' ? 'accepted' : 'rejected'}.`
            });
          },
          error: (error) => {
            console.error('Error creating manual decision:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update proposal status.'
            });
          }
        });
    } catch (error) {
      console.error('Error creating manual decision:', error);
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
