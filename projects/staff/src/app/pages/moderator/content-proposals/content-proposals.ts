import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { MarkOccurrenceProposalModerationService } from '@core/services/proposal/mark-occurrence-proposal-moderation.service';
import { ProposalModeratorViewDto } from '@api/model/proposal-moderator-view-dto';
import { ManualDecisionRequest } from '@api/model/manual-decision-request';
import { AppToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { AppTableComponent } from '../../../components/table/table.component';
import { StatusFilterComponent } from '../../../components/status-filter/status-filter.component';
import { BaseFilterTableComponent } from '../../../shared/base-filter-table.component';
import { firstValueFrom } from 'rxjs';

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
      [data]="filteredItems()"
      [columns]="columns"
      [globalFilterFields]="['monumentName', 'status', 'submissionSource']"
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
export class ContentProposals
  extends BaseFilterTableComponent<ProposalModeratorViewDto>
  implements OnInit
{
  @ViewChild('table') tableComp!: AppTableComponent;

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
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private moderationService: MarkOccurrenceProposalModerationService
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.initData();
    } catch (error) {
      console.error('Error loading proposals:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load proposals.'
      });
    }
  }

  async loadData(): Promise<ProposalModeratorViewDto[]> {
    return await firstValueFrom(this.moderationService.getAllProposals());
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

      await firstValueFrom(this.moderationService.createManualDecision(item.id, request));

      // Reload data to get updated status
      await this.initData();

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `The proposal has been ${outcome === 'ACCEPT' ? 'accepted' : 'rejected'}.`
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
}
