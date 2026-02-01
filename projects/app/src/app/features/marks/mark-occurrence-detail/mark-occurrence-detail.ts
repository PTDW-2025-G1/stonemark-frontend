import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MarkOccurrenceService } from '@core/services/mark-occurrence/mark-occurrence.service';
import { DateUtils } from '@shared/utils/date.utils';
import { ReportModalComponent } from '@shared/ui/report-modal/report-modal';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/ui/breadcrumb/breadcrumb';
import { ImageUtils, ImageVariant } from '@shared/utils/image.utils';
import { MARKS_ICON } from '@core/constants/content-icons';
import {MarkOccurrenceDetailedDto} from '@api/model/mark-occurrence-detailed-dto';
import {AdminUserService} from '@core/services/user/admin-user.service';
import {UserPublicDto} from '@api/model/user-public-dto';
import {finalize} from 'rxjs/operators';
import {ReportFacade} from '@shared/facades/report.facade';
import { ShareFacade } from '@shared/facades/share.facade';

@Component({
  selector: 'app-mark-occurrence-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReportModalComponent, BreadcrumbComponent],
  templateUrl: './mark-occurrence-detail.html'
})
export class MarkOccurrenceDetail implements OnInit {
  occurrence: MarkOccurrenceDetailedDto = {} as MarkOccurrenceDetailedDto;
  loading = true;
  breadcrumbItems: BreadcrumbItem[] = [];
  proposer: UserPublicDto | null = null;
  proposerLoading = false;
  proposerLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private markOccurrenceService: MarkOccurrenceService,
    private userManagementService: AdminUserService,
    public reportFacade: ReportFacade,
    public shareFacade: ShareFacade
  ) { }

  ngOnInit(): void {
    const occurrenceId = this.route.snapshot.paramMap.get('id');
    if (occurrenceId) {
      this.loadOccurrenceDetail(Number(occurrenceId));
    }
  }

  loadOccurrenceDetail(id: number): void {
    this.markOccurrenceService.getById(id).subscribe({
      next: (occurrence) => {
        if (occurrence) {
          this.occurrence = occurrence;
          this.titleService.setTitle(`Occurrence at ${occurrence.monument?.name} - StoneMark`);
          this.updateBreadcrumbs();
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading occurrence:', err);
        this.loading = false;
        this.router.navigate(['/marks']);
      }
    });
  }

  loadProposer(): void {
    if (this.proposerLoaded || this.proposerLoading || !this.occurrence.authorId) return;

    this.proposerLoading = true;
    this.userManagementService.publicGetById(this.occurrence.authorId)
      .pipe(finalize(() => this.proposerLoading = false))
      .subscribe({
        next: (user) => {
          if (user) {
            this.proposer = user;
            this.proposerLoaded = true;
          }
        },
        error: (err) => {
          console.error('Error loading proposer:', err);
        }
      });
  }

  updateBreadcrumbs(): void {
    this.breadcrumbItems = [
      { label: 'Marks', link: '/marks', iconHtml: MARKS_ICON }
    ];

    if (this.occurrence.markId) {
      this.breadcrumbItems.push({
        label: 'Mark Details',
        link: ['/marks', this.occurrence.markId]
      });

      this.breadcrumbItems.push({
        label: `Occurrence #${this.occurrence.id}`,
        link: [],
        active: true,
        icon: 'bi bi-pin-map-fill'
      });
    }
  }

  viewMonument(): void {
    if (this.occurrence?.monument?.id) {
      this.router.navigate(['/monuments', this.occurrence.monument.id]);
    }
  }

  viewMark(): void {
    if (this.occurrence?.markId) {
      this.router.navigate(['/marks', this.occurrence.markId]);
    }
  }

  getFormattedDate(date: string | Date | undefined): string {
    return DateUtils.formatShortDate(date);
  }

  getUserInitials(): string {
    const user = this.proposer;
    if (!user) return 'U';

    const userName = user.username || [user.firstName, user.lastName].filter(Boolean).join(' ');
    if (!userName) return 'U';

    const nameParts = userName.trim().split(' ');
    if (nameParts.length === 0) return 'U';

    const firstInitial = nameParts[0]?.[0] || '';
    const lastInitial = nameParts[nameParts.length - 1]?.[0] || '';

    return `${firstInitial}${lastInitial}`.toUpperCase();
  }

  getProposerName(): string {
    if (!this.proposer) return 'Unknown';
    return this.proposer.username || [this.proposer.firstName, this.proposer.lastName].filter(Boolean).join(' ') || 'Unknown';
  }

  getProposerImage(): string | null {
    return ImageUtils.getImageUrl(this.proposer?.photoId, "assets/portrait-placeholder.png", ImageVariant.THUMBNAIL);
  }

  openReportModal(): void {
    if (!this.occurrence?.id) return;
    this.reportFacade.open({
      targetId: this.occurrence.id,
      targetType: 'MARK_OCCURRENCE',
      targetName: `Occurrence at ${this.occurrence.monument?.name ?? ''}`
    });
  }

  getImageUrl(): string {
    return ImageUtils.getImageUrl(this.occurrence.coverId, 'assets/placeholder.png', ImageVariant.PREVIEW);
  }

  getMonumentImageUrl(): string {
    return ImageUtils.getImageUrl(this.occurrence.monument?.coverId, 'assets/placeholder.png', ImageVariant.OPTIMIZED);
  }
}
