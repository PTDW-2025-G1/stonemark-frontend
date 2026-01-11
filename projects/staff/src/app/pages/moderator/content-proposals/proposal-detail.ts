import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { Timeline } from 'primeng/timeline';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Divider } from 'primeng/divider';
import { Tag } from 'primeng/tag';
import { MarkOccurrenceProposalModerationService } from '@core/services/proposal/mark-occurrence-proposal-moderation.service';
import { ProposalModeratorViewDto } from '@api/model/proposal-moderator-view-dto';
import { DecisionHistoryItem } from '@api/model/decision-history-item';
import { ManualDecisionRequest } from '@api/model/manual-decision-request';
import { firstValueFrom } from 'rxjs';
import { getSeverity } from '../../../utils/severity.util';
import { environment } from '@core/environments/environment';

@Component({
  selector: 'app-proposal-detail',
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
  styleUrls: ['./proposal-detail.scss'],
  template: `
    <p-toast />
    <p-confirmDialog />

    <div class="proposal-detail-container">
      @if (loading) {
        <div class="loading-container">
          <i class="pi pi-spinner pi-spin" style="font-size: 2rem"></i>
          <p>Loading proposal details...</p>
        </div>
      } @else if (proposal) {
        <!-- Header -->
        <div class="header-section">
          <button
            pButton
            icon="pi pi-arrow-left"
            label="Back to Proposals"
            class="p-button-text"
            (click)="goBack()">
          </button>

          <div class="header-content">
            <div class="title-section">
              <h1>Proposal #{{ proposal.id }}</h1>
              <p-tag
                [value]="proposal.status"
                [severity]="getSeverity(proposal.status || '')"
                styleClass="ml-2">
              </p-tag>
            </div>
            <p class="subtitle">{{ proposal.monumentName || 'Unnamed Monument' }}</p>
          </div>
        </div>

        <!-- Main Content -->
        <div class="content-grid">
          <!-- Left Column: Proposal Details -->
          <div class="left-column">
            <p-card>
              <ng-template pTemplate="header">
                <div class="card-header-custom">
                  <i class="pi pi-file"></i>
                  <span>Proposal Information</span>
                </div>
              </ng-template>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">
                    <i class="pi pi-monument"></i>
                    <label>Monument Name</label>
                  </div>
                  <span class="info-value">{{ proposal.monumentName || 'N/A' }}</span>
                </div>
                <div class="info-item">
                  <div class="info-label">
                    <i class="pi pi-flag"></i>
                    <label>Priority</label>
                  </div>
                  <span class="info-value">{{ proposal.priority || 'N/A' }}</span>
                </div>
                <div class="info-item">
                  <div class="info-label">
                    <i class="pi pi-inbox"></i>
                    <label>Submission Source</label>
                  </div>
                  <span class="info-value">{{ proposal.submissionSource || 'N/A' }}</span>
                </div>
                <div class="info-item">
                  <div class="info-label">
                    <i class="pi pi-user"></i>
                    <label>Submitted By</label>
                  </div>
                  <span class="info-value">User ID: {{ proposal.submittedById || 'N/A' }}</span>
                </div>
                <div class="info-item">
                  <div class="info-label">
                    <i class="pi pi-calendar"></i>
                    <label>Submitted At</label>
                  </div>
                  <span class="info-value">{{ formatDate(proposal.submittedAt) }}</span>
                </div>
                <div class="info-item full-width">
                  <div class="info-label">
                    <i class="pi pi-map-marker"></i>
                    <label>Coordinates</label>
                  </div>
                  <span class="info-value">
                    Lat: {{ proposal.latitude || 'N/A' }},
                    Lng: {{ proposal.longitude || 'N/A' }}
                  </span>
                </div>
                @if (proposal.userNotes) {
                  <div class="info-item full-width">
                    <div class="info-label">
                      <i class="pi pi-comment"></i>
                      <label>User Notes</label>
                    </div>
                    <p class="notes">{{ proposal.userNotes }}</p>
                  </div>
                }
              </div>
            </p-card>

            @if (proposal.activeDecision) {
              <p-card styleClass="active-decision-card">
                <ng-template pTemplate="header">
                  <div class="card-header-custom">
                    <i class="pi pi-check-circle"></i>
                    <span>Active Decision</span>
                  </div>
                </ng-template>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">
                      <i class="pi pi-cog"></i>
                      <label>Type</label>
                    </div>
                    <span class="info-value">{{ proposal.activeDecision.type }}</span>
                  </div>
                  <div class="info-item">
                    <div class="info-label">
                      <i class="pi pi-flag-fill"></i>
                      <label>Outcome</label>
                    </div>
                    <div class="info-value">
                      <p-tag
                        [value]="proposal.activeDecision.outcome || ''"
                        [severity]="getOutcomeSeverity(proposal.activeDecision.outcome || '')">
                      </p-tag>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">
                      <i class="pi pi-verified"></i>
                      <label>Confident</label>
                    </div>
                    <span class="info-value">
                      <i [class]="proposal.activeDecision.confident ? 'pi pi-check confident-yes' : 'pi pi-times confident-no'"></i>
                      {{ proposal.activeDecision.confident ? 'Yes' : 'No' }}
                    </span>
                  </div>
                  <div class="info-item">
                    <div class="info-label">
                      <i class="pi pi-clock"></i>
                      <label>Decided At</label>
                    </div>
                    <span class="info-value">{{ formatDate(proposal.activeDecision.decidedAt) }}</span>
                  </div>
                  @if (proposal.activeDecision.decidedBy) {
                    <div class="info-item">
                      <div class="info-label">
                        <i class="pi pi-user"></i>
                        <label>Decided By</label>
                      </div>
                      <span class="info-value">User ID: {{ proposal.activeDecision.decidedBy }}</span>
                    </div>
                  }
                  @if (proposal.activeDecision.notes) {
                    <div class="info-item full-width">
                      <div class="info-label">
                        <i class="pi pi-comment"></i>
                        <label>Notes</label>
                      </div>
                      <p class="notes">{{ proposal.activeDecision.notes }}</p>
                    </div>
                  }
                </div>
              </p-card>
            }

            @if (proposal.activeDecision?.detectedMonument) {
              <p-card>
                <ng-template pTemplate="header">
                  <div class="card-header-custom">
                    <i class="pi pi-building"></i>
                    <span>Detected Monument</span>
                  </div>
                </ng-template>
                <div class="info-grid">
                  <div class="info-item full-width">
                    <div class="info-label">
                      <i class="pi pi-monument"></i>
                      <label>Name</label>
                    </div>
                    <div class="info-value">
                      <a [href]="getMonumentUrl(proposal.activeDecision!.detectedMonument!.id)" target="_blank" class="link-primary">
                        {{ proposal.activeDecision!.detectedMonument!.name }}
                        <i class="pi pi-external-link ml-2"></i>
                      </a>
                    </div>
                  </div>
                  @if (proposal.activeDecision!.detectedMonument!.description) {
                    <div class="info-item full-width">
                      <div class="info-label">
                        <i class="pi pi-align-left"></i>
                        <label>Description</label>
                      </div>
                      <p class="notes">{{ proposal.activeDecision!.detectedMonument!.description }}</p>
                    </div>
                  }
                  @if (proposal.activeDecision!.detectedMonument!.city) {
                    <div class="info-item">
                      <div class="info-label">
                        <i class="pi pi-map-marker"></i>
                        <label>City</label>
                      </div>
                      <span class="info-value">{{ proposal.activeDecision!.detectedMonument!.city }}</span>
                    </div>
                  }
                  @if (proposal.activeDecision!.detectedMonument!.protectionTitle) {
                    <div class="info-item">
                      <div class="info-label">
                        <i class="pi pi-shield"></i>
                        <label>Protection</label>
                      </div>
                      <span class="info-value">{{ proposal.activeDecision!.detectedMonument!.protectionTitle }}</span>
                    </div>
                  }
                  @if (proposal.activeDecision!.detectedMonument!.address) {
                    <div class="info-item full-width">
                      <div class="info-label">
                        <i class="pi pi-map"></i>
                        <label>Address</label>
                      </div>
                      <span class="info-value">{{ proposal.activeDecision!.detectedMonument!.address }}</span>
                    </div>
                  }
                  @if (proposal.activeDecision!.detectedMonument!.latitude && proposal.activeDecision!.detectedMonument!.longitude) {
                    <div class="info-item full-width">
                      <div class="info-label">
                        <i class="pi pi-globe"></i>
                        <label>Coordinates</label>
                      </div>
                      <span class="info-value">
                        Lat: {{ proposal.activeDecision!.detectedMonument!.latitude }},
                        Lng: {{ proposal.activeDecision!.detectedMonument!.longitude }}
                      </span>
                    </div>
                  }
                </div>
              </p-card>
            }

            @if (proposal.activeDecision?.detectedMark) {
              <p-card>
                <ng-template pTemplate="header">
                  <div class="card-header-custom">
                    <i class="pi pi-bookmark"></i>
                    <span>Detected Mark</span>
                  </div>
                </ng-template>
                <div class="info-grid">
                  <div class="info-item full-width">
                    <div class="info-label">
                      <i class="pi pi-bookmark"></i>
                      <label>Mark</label>
                    </div>
                    <div class="info-value">
                      <a [href]="getMarkUrl(proposal.activeDecision!.detectedMark!.id)" target="_blank" class="link-primary">
                        Mark #{{ proposal.activeDecision!.detectedMark!.id }}
                        <i class="pi pi-external-link ml-2"></i>
                      </a>
                    </div>
                  </div>
                  @if (proposal.activeDecision!.detectedMark!.description) {
                    <div class="info-item full-width">
                      <div class="info-label">
                        <i class="pi pi-align-left"></i>
                        <label>Description</label>
                      </div>
                      <p class="notes">{{ proposal.activeDecision!.detectedMark!.description }}</p>
                    </div>
                  }
                  @if (proposal.activeDecision!.detectedMark!.createdAt) {
                    <div class="info-item">
                      <div class="info-label">
                        <i class="pi pi-calendar"></i>
                        <label>Created At</label>
                      </div>
                      <span class="info-value">{{ formatDate(proposal.activeDecision!.detectedMark!.createdAt) }}</span>
                    </div>
                  }
                  @if (proposal.activeDecision!.detectedMark!.createdBy) {
                    <div class="info-item">
                      <div class="info-label">
                        <i class="pi pi-user"></i>
                        <label>Created By</label>
                      </div>
                      <span class="info-value">{{ proposal.activeDecision!.detectedMark!.createdBy!.identifier }}</span>
                    </div>
                  }
                </div>
              </p-card>
            }
          </div>

          <!-- Right Column: Actions & History -->
          <div class="right-column">
            <!-- Action Buttons -->
            <p-card styleClass="actions-card">
              <ng-template pTemplate="header">
                <div class="card-header-custom">
                  <i class="pi pi-sliders-h"></i>
                  <span>Moderation Actions</span>
                </div>
              </ng-template>
              <div class="action-buttons">
                @if (canModerate()) {
                  <button
                    pButton
                    label="Accept Proposal"
                    icon="pi pi-check"
                    class="p-button-success action-btn"
                    (click)="confirmManualDecision('ACCEPT')">
                  </button>
                  <button
                    pButton
                    label="Reject Proposal"
                    icon="pi pi-times"
                    class="p-button-danger action-btn"
                    (click)="confirmManualDecision('REJECT')">
                  </button>
                  <p-divider class="action-divider" />
                }
                <button
                  pButton
                  label="Rerun Automatic Decision"
                  icon="pi pi-refresh"
                  class="p-button-secondary action-btn"
                  (click)="confirmRerunAutomatic()">
                </button>
              </div>
            </p-card>

            <!-- Decision History -->
            <p-card>
              <ng-template pTemplate="header">
                <div class="card-header-custom">
                  <i class="pi pi-history"></i>
                  <span>Decision History</span>
                </div>
              </ng-template>
              @if (loadingHistory) {
                <div class="text-center">
                  <i class="pi pi-spinner pi-spin"></i>
                  <p>Loading history...</p>
                </div>
              } @else if (history.length > 0) {
                <p-timeline [value]="history" align="left">
                  <ng-template pTemplate="content" let-item>
                    <div class="history-item">
                      <div class="history-header">
                        <p-tag
                          [value]="item.type || ''"
                          [severity]="item.type === 'AUTOMATIC' ? 'info' : 'warn'">
                        </p-tag>
                        <p-tag
                          [value]="item.outcome || ''"
                          [severity]="getOutcomeSeverity(item.outcome || '')">
                        </p-tag>
                      </div>
                      <p class="history-date">
                        <i class="pi pi-calendar"></i>
                        {{ formatDate(item.decidedAt) }}
                      </p>
                      @if (item.decidedBy) {
                        <p class="history-user">
                          <i class="pi pi-user"></i>
                          User ID: {{ item.decidedBy }}
                        </p>
                      }
                      @if (item.notes) {
                        <p class="history-notes">{{ item.notes }}</p>
                      }
                      <button
                        pButton
                        label="Activate This Decision"
                        icon="pi pi-replay"
                        class="p-button-sm p-button-outlined"
                        (click)="confirmActivateDecision(item)">
                      </button>
                    </div>
                  </ng-template>
                </p-timeline>
              } @else {
                <p class="text-center text-muted">No decision history available.</p>
              }
            </p-card>
          </div>
        </div>
      } @else {
        <div class="error-container">
          <i class="pi pi-exclamation-triangle" style="font-size: 2rem"></i>
          <p>Proposal not found</p>
          <button pButton label="Go Back" (click)="goBack()"></button>
        </div>
      }
    </div>
  `
})
export class ProposalDetailComponent implements OnInit {
  proposal: ProposalModeratorViewDto | null = null;
  history: DecisionHistoryItem[] = [];
  loading = true;
  loadingHistory = true;
  proposalId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moderationService: MarkOccurrenceProposalModerationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.proposalId = parseInt(id, 10);
      await this.loadProposal();
      await this.loadHistory();
    } else {
      this.loading = false;
    }
  }

  async loadProposal(): Promise<void> {
    if (!this.proposalId) return;

    try {
      this.loading = true;
      this.proposal = await firstValueFrom(
        this.moderationService.getProposal(this.proposalId)
      );
    } catch (error) {
      console.error('Error loading proposal:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load proposal details.'
      });
    } finally {
      this.loading = false;
    }
  }

  async loadHistory(): Promise<void> {
    if (!this.proposalId) return;

    try {
      this.loadingHistory = true;
      this.history = await firstValueFrom(
        this.moderationService.getDecisionHistory(this.proposalId)
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

  canModerate(): boolean {
    return this.proposal?.status === 'SUBMITTED' ||
           this.proposal?.status === 'UNDER_REVIEW';
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
        this.moderationService.createManualDecision(this.proposalId, request)
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Proposal has been ${outcome === 'ACCEPT' ? 'accepted' : 'rejected'}.`
      });

      // Reload data
      await this.loadProposal();
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
        this.moderationService.rerunAutomaticDecision(this.proposalId)
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Automatic decision has been rerun.'
      });

      // Reload data
      await this.loadProposal();
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

  confirmActivateDecision(item: DecisionHistoryItem): void {
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
        this.moderationService.activateDecision(this.proposalId, attemptId)
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Decision has been activated.'
      });

      // Reload data
      await this.loadProposal();
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

  getSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    return getSeverity(status);
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

  goBack(): void {
    this.router.navigate(['/moderator/content-proposals']);
  }

  getMonumentUrl(id: number | undefined): string {
    if (!id) return '#';
    return `${environment.baseUrl}/monuments/${id}`;
  }

  getMarkUrl(id: number | undefined): string {
    if (!id) return '#';
    return `${environment.baseUrl}/marks/${id}`;
  }
}

