import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Tag } from 'primeng/tag';
import { AdminProposalService } from '@core/services/proposal/admin-proposal.service';
import { ProposalWithRelationsDto } from '@api/model/proposal-with-relations-dto';
import { firstValueFrom } from 'rxjs';
import { getSeverity } from '../../../utils/severity.util';
import { environment } from '@core/environments/environment';
import { ImageUtils, ImageVariant } from '@shared/utils/image.utils';
import { ProposalDecisionsComponent } from '../../../components/proposal-decisions/proposal-decisions.component';

@Component({
  selector: 'app-proposal-detail',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    Card,
    Toast,
    ConfirmDialog,
    Tag,
    ProposalDecisionsComponent
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
            <p class="subtitle">
                @if (proposal.existingMonument) {
                    {{ proposal.existingMonument.name }}
                } @else {
                    New Monument Proposal
                }
            </p>
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
                  <span class="info-value">
                    @if (proposal.submittedBy) {
                        {{ proposal.submittedBy.username }} (ID: {{ proposal.submittedBy.id }})
                    } @else {
                        N/A
                    }
                  </span>
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

            <app-proposal-decisions
                [proposalId]="proposalId"
                [canModerate]="canModerate()"
                (decisionChanged)="onDecisionChanged()">
             </app-proposal-decisions>
          </div>

          <!-- Right Column: Media -->
          <div class="right-column">
             @if (proposal.originalMediaFile) {
                <p-card>
                    <ng-template pTemplate="header">
                        <div class="card-header-custom">
                            <i class="pi pi-image"></i>
                            <span>Media</span>
                        </div>
                    </ng-template>
                    <div class="media-container">
                        <img [src]="getImageUrl(proposal.originalMediaFile.id!)" alt="Proposal Media" style="width: 100%; border-radius: 4px;" />
                    </div>
                </p-card>
             }
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
  proposal: ProposalWithRelationsDto | null = null;
  loading = true;
  proposalId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminProposalService: AdminProposalService,
    private messageService: MessageService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.proposalId = parseInt(id, 10);
      await this.loadProposal();
    } else {
      this.loading = false;
    }
  }

  async loadProposal(): Promise<void> {
    if (!this.proposalId) return;

    try {
      this.loading = true;
      this.proposal = await firstValueFrom(
        this.adminProposalService.getProposalDetails(this.proposalId)
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

  canModerate(): boolean {
    return this.proposal?.status === 'SUBMITTED' ||
           this.proposal?.status === 'UNDER_REVIEW';
  }

  async onDecisionChanged(): Promise<void> {
    await this.loadProposal();
  }

  formatDate(date: string | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString();
  }

  getSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    return getSeverity(status);
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

  getImageUrl(fileId: number): string {
      return ImageUtils.getImageUrl(fileId, 'assets/placeholder.png', ImageVariant.PREVIEW);
  }
}
