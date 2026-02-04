import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { Timeline } from 'primeng/timeline';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Divider } from 'primeng/divider';
import { Tag } from 'primeng/tag';
import { ProposalDecisionService } from '@core/services/proposal/proposal-decision.service';
import { ActiveDecisionViewDto } from '@api/model/active-decision-view-dto';
import { ManualDecisionRequest } from '@api/model/manual-decision-request';
import { firstValueFrom } from 'rxjs';
import { getSeverity } from '../../utils/severity.util';

@Component({
  selector: 'app-proposal-decisions',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    Card,
    Timeline,
    Toast,
    ConfirmDialog,
    Divider,
    Tag
  ],
  providers: [ConfirmationService, MessageService],
  template: `
    <p-toast />
    <p-confirmDialog />

    <div class="proposal-decisions-container">
      <!-- Action Buttons -->
      <p-card styleClass="actions-card mb-3">
        <ng-template pTemplate="header">
          <div class="card-header-custom p-3 flex align-items-center gap-2">
            <i class="pi pi-sliders-h"></i>
            <span class="font-bold">Moderation Actions</span>
          </div>
        </ng-template>
        <div class="action-buttons flex flex-column gap-2">
          @if (canModerate) {
            <button
              pButton
              label="Accept Proposal"
              icon="pi pi-check"
              class="p-button-success action-btn w-full"
              (click)="confirmManualDecision('ACCEPT')">
            </button>
            <button
              pButton
              label="Reject Proposal"
              icon="pi pi-times"
              class="p-button-danger action-btn w-full"
              (click)="confirmManualDecision('REJECT')">
            </button>
            <p-divider class="action-divider" />
          }
          <button
            pButton
            label="Rerun Automatic Decision"
            icon="pi pi-refresh"
            class="p-button-secondary action-btn w-full"
            (click)="confirmRerunAutomatic()">
          </button>
        </div>
      </p-card>

      <!-- Decision History -->
      <p-card>
        <ng-template pTemplate="header">
          <div class="card-header-custom p-3 flex align-items-center gap-2">
            <i class="pi pi-history"></i>
            <span class="font-bold">Decision History</span>
          </div>
        </ng-template>
        @if (loadingHistory) {
          <div class="text-center p-3">
            <i class="pi pi-spinner pi-spin" style="font-size: 2rem"></i>
            <p class="mt-2">Loading history...</p>
          </div>
        } @else if (history.length > 0) {
          <p-timeline [value]="history" align="left">
            <ng-template pTemplate="content" let-item>
              <div class="history-item mb-3">
                <div class="history-header flex align-items-center gap-2 mb-2">
                  <p-tag
                    [value]="item.type || ''"
                    [severity]="item.type === 'AUTOMATIC' ? 'info' : 'warn'">
                  </p-tag>
                  <p-tag
                    [value]="item.outcome || ''"
                    [severity]="getOutcomeSeverity(item.outcome || '')">
                  </p-tag>
                </div>
                <p class="history-date text-sm text-500 mb-1">
                  <i class="pi pi-calendar mr-1"></i>
                  {{ formatDate(item.decidedAt) }}
                </p>
                @if (item.decidedByUsername) {
                  <p class="history-user text-sm text-500 mb-1">
                    <i class="pi pi-user mr-1"></i>
                    User: {{ item.decidedByUsername }}
                  </p>
                }
                @if (item.notes) {
                  <p class="history-notes text-sm mb-2">{{ item.notes }}</p>
                }
                <button
                  pButton
                  label="Activate This Decision"
                  icon="pi pi-replay"
                  class="p-button-sm p-button-outlined w-full"
                  (click)="confirmActivateDecision(item)">
                </button>
              </div>
            </ng-template>
          </p-timeline>
        } @else {
          <p class="text-center text-muted p-3">No decision history available.</p>
        }
      </p-card>
    </div>
  `,
  styles: [`
    .card-header-custom {
      border-bottom: 1px solid var(--surface-border);
      background-color: var(--surface-50);
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
  `]
})
export class ProposalDecisionsComponent implements OnInit {
  @Input() proposalId: number | null = null;
  @Input() canModerate: boolean = false;
  @Output() decisionChanged = new EventEmitter<void>();

  history: ActiveDecisionViewDto[] = [];
  loadingHistory = true;

  constructor(
    private proposalDecisionService: ProposalDecisionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.proposalId) {
      await this.loadHistory();
    }
  }

  async loadHistory(): Promise<void> {
    if (!this.proposalId) return;

    try {
      this.loadingHistory = true;
      this.history = await firstValueFrom(
        this.proposalDecisionService.getDecisionHistory(this.proposalId)
      );
    } catch (error) {
      console.error('Error loading history:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load decision history.'
      });
    } finally {
      this.loadingHistory = false;
    }
  }

  confirmManualDecision(outcome: ManualDecisionRequest.OutcomeEnum): void {
    const action = outcome === 'ACCEPT' ? 'accept' : 'reject';
    this.confirmationService.confirm({
      message: `Are you sure you want to ${action} this proposal?`,
      header: 'Confirm Action',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.createManualDecision(outcome)
    });
  }

  async createManualDecision(outcome: ManualDecisionRequest.OutcomeEnum): Promise<void> {
    if (!this.proposalId) return;

    try {
      const request: ManualDecisionRequest = {
        outcome: outcome,
        notes: undefined
      };

      await firstValueFrom(
        this.proposalDecisionService.createManualDecision(this.proposalId, request)
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Proposal has been ${outcome === 'ACCEPT' ? 'accepted' : 'rejected'}.`
      });

      this.decisionChanged.emit();
      await this.loadHistory();
    } catch (error) {
      console.error('Error creating manual decision:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to create manual decision.'
      });
    }
  }

  confirmRerunAutomatic(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to rerun the automatic decision?',
      header: 'Confirm Rerun',
      icon: 'pi pi-question-circle',
      accept: () => this.rerunAutomaticDecision()
    });
  }

  async rerunAutomaticDecision(): Promise<void> {
    if (!this.proposalId) return;

    try {
      await firstValueFrom(
        this.proposalDecisionService.rerunAutomaticDecision(this.proposalId)
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Automatic decision has been rerun.'
      });

      this.decisionChanged.emit();
      await this.loadHistory();
    } catch (error) {
      console.error('Error rerunning automatic decision:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to rerun automatic decision.'
      });
    }
  }

  confirmActivateDecision(item: ActiveDecisionViewDto): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to activate this ${item.type} decision with outcome ${item.outcome}?`,
      header: 'Confirm Activation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.activateDecision(item.id!)
    });
  }

  async activateDecision(attemptId: number): Promise<void> {
    if (!this.proposalId) return;

    try {
      await firstValueFrom(
        this.proposalDecisionService.activateDecision(this.proposalId, attemptId)
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Decision has been activated.'
      });

      this.decisionChanged.emit();
      await this.loadHistory();
    } catch (error) {
      console.error('Error activating decision:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to activate decision.'
      });
    }
  }

  formatDate(date: string | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString();
  }

  getOutcomeSeverity(outcome: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
    switch (outcome) {
      case 'ACCEPT':
        return 'success';
      case 'REJECT':
        return 'danger';
      case 'INCONCLUSIVE':
        return 'warn';
      default:
        return 'info';
    }
  }
}
