import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, tap, switchMap, map } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';

import { BreadcrumbComponent, BreadcrumbItem } from '@shared/ui/breadcrumb/breadcrumb';
import { LoadingStateComponent } from '@features/marks/mark-detail/sections/loading-state';
import { MarkHeaderComponent } from '@features/marks/mark-detail/sections/mark-header';
import { OccurrencesGridComponent } from '@shared/ui/occurrences-grid/occurrences-grid';
import { EmptyStateComponent } from '@features/marks/mark-detail/sections/empty-state';
import { InfoBoxComponent } from '@features/marks/mark-detail/sections/info-box';
import { PaginationComponent } from '@shared/ui/pagination/pagination';
import { SharedSelectComponent } from '@shared/ui/shared-select/shared-select';
import { MarkDto } from '@api/model/mark-dto';
import { MarkService } from '@core/services/mark/mark.service';
import { BookmarkService } from '@core/services/bookmark/bookmark.service';
import { BookmarkDto } from '@api/model/bookmark-dto';
import { AuthService } from '@core/services/auth/auth.service';
import { environment } from '@env/environment';
import { MonumentService } from '@core/services/monument/monument.service';
import { MonumentResponseDto } from '@api/model/monument-response-dto';
import { ReportModalComponent, ReportModalConfig } from '@shared/ui/report-modal/report-modal';
import { ReportService } from '@core/services/report/report.service';
import { ReportRequestDto } from '@api/model/report-request-dto';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-mark-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent, LoadingStateComponent, MarkHeaderComponent, OccurrencesGridComponent, EmptyStateComponent, InfoBoxComponent, PaginationComponent, SharedSelectComponent, ReportModalComponent],
  templateUrl: './mark-detail.html'
})
export class MarkDetailComponent implements OnInit {
  mark$!: Observable<MarkDto>;
  occurrences: MarkOccurrenceDto[] = [];
  breadcrumbItems$!: Observable<BreadcrumbItem[]>;
  loading = true;
  occurrencesCount = 0;
  uniqueMonumentsCount = 0;
  bookmarksCount = 0;
  isBookmarked = false;

  currentPage = 1;
  totalPages = 1;
  pageSize = 6;

  monuments: MonumentResponseDto[] = [];
  selectedMonumentId: number | string = '';

  // Report modal
  reportModalVisible = false;
  reportModalConfig: ReportModalConfig | null = null;

  private currentMarkId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private markService: MarkService,
    private markOccurrenceService: MarkOccurrenceService,
    private bookmarkService: BookmarkService,
    private authService: AuthService,
    private monumentService: MonumentService,
    private reportService: ReportService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.mark$ = this.route.paramMap.pipe(
      switchMap(params => {
        const markId = Number(params.get('id'));
        this.currentMarkId = markId;

        this.loadMonuments(markId);

        this.loadOccurrences(markId, 0);

        this.markOccurrenceService.countByMarkId(markId).subscribe(count => {
          this.occurrencesCount = count;
        });

        if (this.authService.getAccessToken()) {
          this.loadBookmarkState(markId);
        }

        return this.markService.getMark(markId);
      }),
      tap(mark => {
        if (mark?.title) {
          this.titleService.setTitle(mark.title);
        }
      })
    );

    this.breadcrumbItems$ = this.mark$.pipe(
      map(mark => [
        { label: 'Marks', link: '/search/marks', icon: 'bi bi-grid-3x3-gap' },
        { label: mark?.title ?? 'Mark', link: ['/marks', mark?.id], active: true }
      ])
    );
  }

  private loadBookmarkState(markId: number): void {
    this.bookmarkService.isBookmarked(BookmarkDto.TypeEnum.Mark, markId).subscribe(isBookmarked => {
      this.isBookmarked = isBookmarked;
    });
    this.bookmarkService.getUserBookmarks().subscribe(bookmarks => {
      this.bookmarksCount = bookmarks.filter(b => b.type === BookmarkDto.TypeEnum.Mark && b.targetId === markId).length;
    });
  }

  private loadMonuments(markId: number): void {
    this.markOccurrenceService.getAvailableMonumentsByMark(markId).subscribe({
      next: monuments => {
        this.monuments = monuments;
        console.log('Available monuments for mark:', monuments.length, monuments);
      },
      error: err => {
        console.error('Error loading monuments for filter:', err);
      }
    });
  }

  private loadOccurrences(markId: number, page: number = 0): void {
    this.loading = true;

    const request$ = this.selectedMonumentId
      ? this.markOccurrenceService.filterByMarkAndMonument(markId, Number(this.selectedMonumentId), page, this.pageSize)
      : this.markOccurrenceService.getByMarkId(markId, page, this.pageSize);

    request$.subscribe({
      next: (pageData: any) => {
        this.occurrences = pageData.content ?? [];
        this.totalPages = pageData.totalPages ?? 1;
        this.currentPage = (pageData.number ?? 0) + 1; // Backend uses 0-based, UI uses 1-based

        this.uniqueMonumentsCount = new Set(
          pageData.content?.map((o: any) => o.monument?.id).filter(Boolean)
        ).size;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading occurrences:', err);
        this.occurrences = [];
        this.loading = false;
      }
    });
  }

  onPageChange(page: number): void {
    if (this.currentMarkId != null) {
      this.loadOccurrences(this.currentMarkId, page - 1); // Convert to 0-based for backend
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onMonumentFilterChange(monumentId: string | number): void {
    this.selectedMonumentId = monumentId;
    this.currentPage = 1;
    if (this.currentMarkId != null) {
      this.loadOccurrences(this.currentMarkId, 0);
    }
  }

  toggleBookmark(): void {
    if (!this.authService.getAccessToken()) {
      window.location.href = `${environment.authUrl}/login`;
      return;
    }

    if (this.currentMarkId == null) return;

    if (this.isBookmarked) {
      this.bookmarkService.getUserBookmarks().subscribe(bookmarks => {
        const bookmark = bookmarks.find(b =>
          b.type === BookmarkDto.TypeEnum.Mark && b.targetId === this.currentMarkId
        );
        if (bookmark?.id != null) {
          this.bookmarkService.deleteBookmark(bookmark.id).subscribe(() => {
            this.isBookmarked = false;
            this.bookmarksCount = Math.max(0, this.bookmarksCount - 1);
          });
        }
      });
    } else {
      this.bookmarkService.createBookmark(BookmarkDto.TypeEnum.Mark, this.currentMarkId).subscribe(() => {
        this.isBookmarked = true;
        this.bookmarksCount += 1;
      });
    }
  }

  viewOccurrence(occurrenceId: number): void {
    this.router.navigate(['marks/occurrence', occurrenceId]);
  }

  viewMonument(monumentId: number): void {
    this.router.navigate(['/monuments', monumentId]);
  }

  openReportModal(): void {
    if (!this.authService.getAccessToken()) {
      window.location.href = `${environment.authUrl}/login`;
      return;
    }

    // Get the current mark ID from the component
    if (!this.currentMarkId) return;

    this.markService.getMark(this.currentMarkId).subscribe(mark => {
      if (mark && mark.id) {
        this.reportModalConfig = {
          targetId: mark.id,
          targetType: 'MARK' as ReportRequestDto.TargetTypeEnum,
          targetName: mark.title
        };
        this.reportModalVisible = true;
      }
    });
  }

  handleReportSubmit(report: ReportRequestDto): void {
    this.reportService.createReport(report).subscribe({
      next: () => {
        this.notificationService.showSuccess('Report submitted successfully. Thank you for your feedback!');
        this.reportModalVisible = false;
      },
      error: (err) => {
        console.error('Error submitting report:', err);
        this.notificationService.showError('Failed to submit report. Please try again.');
        this.reportModalVisible = false;
      }
    });
  }
}
