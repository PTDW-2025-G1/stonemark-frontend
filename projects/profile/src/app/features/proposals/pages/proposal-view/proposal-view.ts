import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MarkOccurrenceProposalService } from '@core/services/proposal/mark-occurrence/mark-occurrence-proposal.service';
import { MarkOccurrenceProposalDto } from '@api/model/mark-occurrence-proposal-dto';
import { ImageUtils, ImageVariant } from '@shared/utils/image.utils';
import { ButtonComponent } from '@shared/ui/button/button';
import { SafeHtmlPipe } from '@shared/pipes/safe-html.pipe';
import { environment } from '@env/environment';
import { MONUMENTS_ICON, MARKS_ICON } from '@core/constants/content-icons';

@Component({
  selector: 'app-proposal-view',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, SafeHtmlPipe],
  templateUrl: './proposal-view.html'
})
export class ProposalViewComponent implements OnInit {
  proposal: MarkOccurrenceProposalDto | null = null;
  loading = true;
  error = false;

  monumentsIcon = MONUMENTS_ICON;
  marksIcon = MARKS_ICON;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private proposalService: MarkOccurrenceProposalService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProposal(+id);
    }
  }

  loadProposal(id: number): void {
    this.loading = true;
    this.proposalService.findById(id).subscribe({
      next: (data) => {
        this.proposal = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading proposal:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  getImageUrl(coverId?: number): string {
    return ImageUtils.getImageUrl(coverId, 'assets/placeholder.png', ImageVariant.PREVIEW);
  }

  getStatusLabel(status?: string): string {
    if (!status) return 'Unknown';
    return status
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getSubmissionSourceLabel(source?: string): string {
    if (!source) return 'Unknown';
    return source
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getSubmissionSourceIcon(source?: string): string {
    switch (source) {
      case 'WEB_APP':
        return 'bi-globe';
      case 'STAFF_APP':
        return 'bi-shield-check';
      case 'WHATSAPP':
        return 'bi-whatsapp';
      case 'TELEGRAM_BOT':
        return 'bi-telegram';
      case 'API':
        return 'bi-code-slash';
      default:
        return 'bi-question-circle';
    }
  }

  getMonumentUrl(monumentId?: number): string {
    if (!monumentId) return '#';
    return `${environment.baseUrl}/monuments/${monumentId}`;
  }

  getMarkUrl(markId?: number): string {
    if (!markId) return '#';
    return `${environment.baseUrl}/marks/${markId}`;
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }
}
