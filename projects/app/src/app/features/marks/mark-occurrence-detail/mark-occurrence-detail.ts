import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';
import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { DateUtils } from '@shared/utils/date.utils';
import { ReportModalComponent, ReportModalConfig } from '@shared/ui/report-modal/report-modal';
import { ReportService } from '@core/services/report/report.service';
import { ReportRequestDto } from '@api/model/report-request-dto';
import { AuthService } from '@core/services/auth/auth.service';
import { environment } from '@env/environment';
import { NotificationService } from '@core/services/notification.service';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/ui/breadcrumb/breadcrumb';
import { ImageUtils } from '@shared/utils/image.utils';
import { MARKS_ICON } from '@core/constants/content-icons';

@Component({
  selector: 'app-mark-occurrence-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReportModalComponent, BreadcrumbComponent],
  templateUrl: './mark-occurrence-detail.html'
})
export class MarkOccurrenceDetail implements OnInit {
  occurrence: MarkOccurrenceDto = {} as MarkOccurrenceDto;
  loading = true;
  breadcrumbItems: BreadcrumbItem[] = [];

  reportModalVisible = false;
  reportModalConfig: ReportModalConfig | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private markOccurrenceService: MarkOccurrenceService,
    private reportService: ReportService,
    private authService: AuthService,
    private notificationService: NotificationService
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

  updateBreadcrumbs(): void {
    this.breadcrumbItems = [
      { label: 'Marks', link: '/marks', iconHtml: MARKS_ICON }
    ];

    if (this.occurrence.mark) {
      this.breadcrumbItems.push({
        label: 'Mark Details',
        link: ['/marks', this.occurrence.mark.id]
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
    if (this.occurrence?.mark?.id) {
      this.router.navigate(['/marks', this.occurrence.mark.id]);
    }
  }

  getFormattedDate(date: string | Date | undefined): string {
    return DateUtils.formatDate(date);
  }

  getUserInitials(): string {
    const userName = this.occurrence?.createdBy;
    if (!userName) return 'U';

    const nameParts = userName.trim().split(' ');
    if (nameParts.length === 0) return 'U';

    const firstInitial = nameParts[0]?.[0] || '';
    const lastInitial = nameParts[nameParts.length - 1]?.[0] || '';

    return `${firstInitial}${lastInitial}`.toUpperCase();
  }

  copyLocation(): void {
    const monument = this.occurrence?.monument;
    if (monument?.latitude && monument?.longitude) {
      const coords = `${monument.latitude}, ${monument.longitude}`;
      navigator.clipboard.writeText(coords);
    }
  }

  shareFacebook(): void {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  }

  shareTwitter(): void {
    const url = window.location.href;
    const text = `Check out this stone mason mark occurrence!`;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
  }

  copyShareLink(): void {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  }

  openInMaps(): void {
    const monument = this.occurrence?.monument;
    if (monument?.latitude && monument?.longitude) {
      window.open(`https://www.google.com/maps?q=${monument.latitude},${monument.longitude}`, '_blank');
    }
  }

  openReportModal(): void {
    if (!this.authService.getAccessToken()) {
      window.location.href = `${environment.authUrl}/login`;
      return;
    }

    if (this.occurrence && this.occurrence.id) {
      const targetName = `Occurrence at ${this.occurrence.monument?.name}`;
      this.reportModalConfig = {
        targetId: this.occurrence.id,
        targetType: 'MARK_OCCURRENCE' as ReportRequestDto.TargetTypeEnum,
        targetName: targetName
      };
      this.reportModalVisible = true;
    }
  }

  handleReportSubmit(report: ReportRequestDto): void {
    this.reportService.createReport(report).subscribe({
      next: () => {
        this.notificationService.showSuccess('Report submitted successfully. Thank you for your contribution!');
        this.reportModalVisible = false;
      },
      error: (err) => {
        console.error('Error submitting report:', err);
        this.notificationService.showError('Failed to submit report. Please try again.');
        this.reportModalVisible = false;
      }
    });
  }

  getImageUrl(): string {
    return ImageUtils.getImageUrl(this.occurrence.mark?.coverId, 'assets/images/placeholder.png');
  }

  getMonumentImageUrl(): string {
    return ImageUtils.getImageUrl(this.occurrence.monument?.coverId, 'assets/images/placeholder.png');
  }
}
