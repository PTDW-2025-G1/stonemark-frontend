import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, tap, switchMap, map } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';
import { MARKS_ICON, MONUMENTS_ICON } from '@core/constants/content-icons';

import { BreadcrumbComponent, BreadcrumbItem } from '@shared/ui/breadcrumb/breadcrumb';
import { LoadingStateComponent } from '@features/marks/mark-detail/sections/loading-state';
import { MarkHeaderComponent } from '@features/marks/mark-detail/sections/mark-header';
import { OccurrencesGridComponent } from '@shared/ui/occurrences-grid/occurrences-grid';
import { EmptyStateComponent } from '@features/marks/mark-detail/sections/empty-state';
import { InfoBoxComponent } from '@features/marks/mark-detail/sections/info-box';
import { PaginationComponent } from '@shared/ui/pagination/pagination';
import { MarkDto } from '@api/model/mark-dto';
import { MarkService } from '@core/services/mark/mark.service';
import { BookmarkService } from '@core/services/bookmark/bookmark.service';
import { BookmarkDto } from '@api/model/bookmark-dto';
import { AuthService } from '@core/services/auth/auth.service';
import { environment } from '@env/environment';
import { MonumentResponseDto } from '@api/model/monument-response-dto';
import { ReportModalComponent, ReportModalConfig } from '@shared/ui/report-modal/report-modal';
import { ReportService } from '@core/services/report/report.service';
import { ReportRequestDto } from '@api/model/report-request-dto';
import { NotificationService } from '@core/services/notification.service';
import { FiltersComponent } from '@shared/ui/filters/filters';

@Component({
  selector: 'app-mark-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent, LoadingStateComponent, MarkHeaderComponent, OccurrencesGridComponent, EmptyStateComponent, InfoBoxComponent, PaginationComponent, FiltersComponent, ReportModalComponent],
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

  selectedSort = 'desc';

  monuments: MonumentResponseDto[] = [];
  selectedMonumentId: number | string = '';

  reportModalVisible = false;
  reportModalConfig: ReportModalConfig | null = null;
  reportModalFieldErrors: Record<string, string> = {};

  monumentsIcon = MONUMENTS_ICON;

  private currentMarkId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private markService: MarkService,
    private markOccurrenceService: MarkOccurrenceService,
    private bookmarkService: BookmarkService,
    private authService: AuthService,
    private reportService: ReportService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.mark$ = this.route.paramMap.pipe(
      switchMap(params => {
        const markId = Number(params.get('id'));
        this.currentMarkId = markId;

        this.route.queryParamMap.subscribe(queryParams => {
          this.currentPage = +(queryParams.get('page') || 1);
          this.selectedMonumentId = queryParams.get('monumentId') ? Number(queryParams.get('monumentId')) : '';
          this.selectedSort = queryParams.get('sort') || 'desc';
          this.loadOccurrences(markId, this.currentPage - 1);
        });

        this.loadMonuments(markId);

        this.markOccurrenceService.countByMarkId(markId).subscribe(count => {
          this.occurrencesCount = count;
        });

        this.markOccurrenceService.countMonumentsByMarkId(markId).subscribe(count => {
          this.uniqueMonumentsCount = count;
        });

        if (this.authService.getAccessToken()) {
          this.loadBookmarkState(markId);
        }

        return this.markService.getMark(markId);
      }),
      tap(mark => {
        if (mark?.description) {
          this.titleService.setTitle(mark.description);
        } else if (mark?.id) {
          this.titleService.setTitle(`Mark #${mark.id}`);
        }
      })
    );

    this.breadcrumbItems$ = this.mark$.pipe(
      map(mark => [
        { label: 'Marks', link: '/search/marks', iconHtml: MARKS_ICON },
        { label: mark?.description ?? `Mark #${mark?.id ?? ''}`, link: ['/marks', mark?.id], active: true }
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
      ? this.markOccurrenceService.filterByMarkAndMonument(markId, Number(this.selectedMonumentId), page, this.pageSize, this.selectedSort)
      : this.markOccurrenceService.getByMarkId(markId, page, this.pageSize, this.selectedSort);

    request$.subscribe({
      next: (pageData: any) => {
        this.occurrences = pageData.content ?? [];
        this.totalPages = pageData.totalPages ?? 1;
        this.currentPage = (pageData.number ?? 0) + 1;
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
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page },
        queryParamsHandling: 'merge'
      });
      this.loadOccurrences(this.currentMarkId, page - 1);
    }
  }

  onSortChange(sort: string | number) {
    this.selectedSort = String(sort);
    this.currentPage = 1;
    if (this.currentMarkId != null) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { sort: this.selectedSort, page: 1 },
        queryParamsHandling: 'merge'
      });
    }
  }

  onMonumentFilterChange(monumentId: string | number): void {
    this.selectedMonumentId = monumentId ? Number(monumentId) : '';
    this.currentPage = 1;
    if (this.currentMarkId != null) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { monumentId, page: 1 },
        queryParamsHandling: 'merge'
      });
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

    if (!this.currentMarkId) return;

    this.markService.getMark(this.currentMarkId).subscribe(mark => {
      if (mark && mark.id) {
        this.reportModalConfig = {
          targetId: mark.id,
          targetType: 'MARK' as ReportRequestDto.TargetTypeEnum,
          targetName: ""
        };
        this.reportModalVisible = true;
      }
    });
  }

  handleReportSubmit(report: ReportRequestDto): void {
    this.reportService.createReport(report).subscribe({
      next: () => {
        this.notificationService.showSuccess(
          'Report submitted successfully. Thank you for helping improve StoneMark!'
        );
        this.reportModalVisible = false;
      },
      error: (err) => {
        console.error('Error submitting report:', err);

        if (err.status === 400 && err.error && typeof err.error === 'object') {
          this.reportModalFieldErrors = err.error;
          return;
        }
        this.notificationService.showError(
          'Failed to submit report. Please try again.'
        );
      }
    });
  }

  protected readonly Number = Number;
}
