import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MonumentService } from '@core/services/monument/monument.service';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { NotificationService } from '@core/services/notification.service';
import { MonumentResponseDto } from '@api/model/monument-response-dto';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';
import { BookmarkService } from '@core/services/bookmark/bookmark.service';
import { BookmarkDto } from '@api/model/bookmark-dto';
import { AuthService } from '@core/services/auth/auth.service';
import { environment } from '@env/environment';
import { ReportModalComponent, ReportModalConfig } from '@shared/ui/report-modal/report-modal';
import { ReportService } from '@core/services/report/report.service';
import { ReportRequestDto } from '@api/model/report-request-dto';
import { ImageUtils } from '@shared/utils/image.utils';
import { MONUMENTS_ICON } from '@core/constants/content-icons';
import { SafeHtmlPipe } from '@shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-monument-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReportModalComponent, SafeHtmlPipe],
  templateUrl: './monument-detail.html'
})
export class MonumentDetailComponent implements OnInit {
  monument$!: Observable<MonumentResponseDto | undefined>;
  mapUrl: SafeResourceUrl | null = null;
  isBookmarked = false;
  bookmarksCount = 0;
  occurrencesCount = 0;
  reportModalVisible = false;
  reportModalConfig: ReportModalConfig | null = null;

  private currentMonumentId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monumentService: MonumentService,
    private markOccurrenceService: MarkOccurrenceService,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private notificationService: NotificationService,
    private bookmarkService: BookmarkService,
    private authService: AuthService,
    private reportService: ReportService
  ) { }

  monumentsIcon = MONUMENTS_ICON;

  ngOnInit(): void {
    const monumentId$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
    );

    this.monument$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        this.currentMonumentId = id;

        this.markOccurrenceService.countByMonumentId(id).subscribe(count => {
          this.occurrencesCount = count;
        });

        return this.monumentService.getMonumentById(id);
      }),
      tap(monument => {
        if (monument && monument.latitude != null && monument.longitude != null) {
          this.setMapUrl(monument.latitude, monument.longitude);
          this.titleService.setTitle(`${monument.name} - StoneMark`);
        } else {
          this.mapUrl = null;
        }
      })
    );


    monumentId$.subscribe(id => {
      if (id != null && this.authService.getAccessToken()) {
        this.loadBookmarkState(id);
      }
    });
  }

  private loadBookmarkState(monumentId: number): void {
    this.bookmarkService.isBookmarked(BookmarkDto.TypeEnum.Monument, monumentId).subscribe(isBookmarked => {
      this.isBookmarked = isBookmarked;
    });
    this.bookmarkService.getUserBookmarks().subscribe(bookmarks => {
      this.bookmarksCount = bookmarks.filter(b => b.type === BookmarkDto.TypeEnum.Monument && b.targetId === monumentId).length;
    });
  }


  toggleBookmark(): void {
    if (!this.authService.getAccessToken()) {
      window.location.href = `${environment.authUrl}/login`;
      return;
    }

    const monumentId = Number(this.route.snapshot.paramMap.get('id'));
    if (!monumentId) return;

    if (this.isBookmarked) {
      this.bookmarkService.getUserBookmarks().subscribe(bookmarks => {
        const bookmark = bookmarks.find(b => b.type === BookmarkDto.TypeEnum.Monument && b.targetId === monumentId);
        if (bookmark && bookmark.id != null) {
          this.bookmarkService.deleteBookmark(bookmark.id).subscribe(() => {
            this.isBookmarked = false;
            this.bookmarksCount = Math.max(0, this.bookmarksCount - 1);
          });
        }
      });
    } else {
      this.bookmarkService.createBookmark(BookmarkDto.TypeEnum.Monument, monumentId).subscribe(() => {
        this.isBookmarked = true;
        this.bookmarksCount += 1;
      });
    }
  }

  captureMark(): void {
    window.open('https://t.me/stonemarkbot', '_blank');
  }

  viewMarks(): void {
    const monumentId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/search/marks'], { queryParams: { monumentId } });
  }

  viewOccurrences(): void {
    if (this.currentMonumentId != null) {
      this.router.navigate(['/monuments', this.currentMonumentId, 'marks']);
    }
  }

  suggestCorrection(): void {
    const monumentId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/suggestions/new'], { queryParams: { monumentId } });
  }


  setMapUrl(latitude: number, longitude: number) {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openDirections(latitude: number, longitude: number) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank');
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.notificationService.showSuccess('Link copied to clipboard!');
    });
  }

  shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }

  shareOnInstagram() {
    window.open('https://www.instagram.com/', '_blank');
  }

  openReportModal(): void {
    if (!this.authService.getAccessToken()) {
      window.location.href = `${environment.authUrl}/login`;
      return;
    }

    const monumentId = this.route.snapshot.paramMap.get('id');
    if (!monumentId) return;

    this.monumentService.getMonumentById(Number(monumentId)).subscribe(monument => {
      if (monument && monument.id) {
        this.reportModalConfig = {
          targetId: monument.id,
          targetType: 'MONUMENT' as ReportRequestDto.TargetTypeEnum,
          targetName: monument.name
        };
        this.reportModalVisible = true;
      }
    });
  }

  handleReportSubmit(report: ReportRequestDto): void {
    this.reportService.createReport(report).subscribe({
      next: () => {
        this.notificationService.showSuccess('Report submitted successfully. Thank you for helping improve StoneMark!');
        this.reportModalVisible = false;
      },
      error: (err) => {
        console.error('Error submitting report:', err);
        this.notificationService.showError('Failed to submit report. Please try again.');
        this.reportModalVisible = false;
      }
    });
  }

  getImageUrl(monument: MonumentResponseDto): string {
    return ImageUtils.getImageUrl(monument.coverId, 'assets/images/placeholder.png');
  }
}
