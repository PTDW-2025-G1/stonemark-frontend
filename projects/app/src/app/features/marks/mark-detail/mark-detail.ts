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
import { BookmarkDto } from '@api/model/bookmark-dto';
import { BookmarkFacade } from '@shared/facades/bookmark.facade';
import { MonumentResponseDto } from '@api/model/monument-response-dto';
import { ReportModalComponent } from '@shared/ui/report-modal/report-modal';
import { ReportFacade } from '@shared/facades/report.facade';
import { ReportRequestDto } from '@api/model/report-request-dto';
import { FiltersComponent } from '@shared/ui/filters/filters';
import { PaginationFacade } from '@shared/facades/pagination.facade';


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

  pageSize = 6;
  selectedSort = 'desc';
  monuments: MonumentResponseDto[] = [];
  selectedMonumentId: number | string = '';

  monumentsIcon = MONUMENTS_ICON;

  private currentMarkId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private markService: MarkService,
    private markOccurrenceService: MarkOccurrenceService,
    public bookmarkFacade: BookmarkFacade,
    public reportFacade: ReportFacade,
    public pagination: PaginationFacade<MarkOccurrenceDto>
  ) { }

  ngOnInit(): void {
    this.mark$ = this.route.paramMap.pipe(
      switchMap(params => {
        const markId = Number(params.get('id'));
        this.currentMarkId = markId;

        this.bookmarkFacade.init(BookmarkDto.TypeEnum.Mark, markId);
        this.loadMonuments(markId);

        this.markOccurrenceService.countByMarkId(markId)
          .subscribe(count => this.occurrencesCount = count);

        this.markOccurrenceService.countMonumentsByMarkId(markId)
          .subscribe(count => this.uniqueMonumentsCount = count);

        return this.route.queryParamMap.pipe(
          tap(queryParams => {
            const page = +(queryParams.get('page') || 1);
            this.pagination.currentPage = page;

            this.selectedMonumentId = queryParams.get('monumentId')
              ? Number(queryParams.get('monumentId'))
              : '';

            this.selectedSort = queryParams.get('sort') || 'desc';

            this.loadOccurrences(markId, page - 1);
          }),
          switchMap(() => this.markService.getMark(markId))
        );
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
        { label: mark?.description ?? `Mark #${mark?.id ?? ''}`, active: true }
      ])
    );
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
      ? this.markOccurrenceService.filterByMarkAndMonument(
        markId,
        Number(this.selectedMonumentId),
        page,
        this.pageSize,
        this.selectedSort
      )
      : this.markOccurrenceService.getByMarkId(
        markId,
        page,
        this.pageSize,
        this.selectedSort
      );

    request$.subscribe({
      next: pageData => {
        const items = pageData.content ?? [];

        this.occurrences = items;

        this.pagination.setServerPage(
          (pageData.number ?? 0) + 1,
          pageData.totalPages ?? 1
        );

        this.loading = false;
      },
      error: err => {
        console.error('Error loading occurrences:', err);
        this.occurrences = [];
        this.pagination.setServerPage(1, 1);
        this.loading = false;
      }
    });
  }

  onPageChange(page: number): void {
    if (!this.currentMarkId) return;

    this.pagination.goToPage(page);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }

  onSortChange(sort: string | number): void {
    this.selectedSort = String(sort);
    this.pagination.currentPage = 1;

    if (!this.currentMarkId) return;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: this.selectedSort, page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  onMonumentFilterChange(monumentId: string | number): void {
    this.selectedMonumentId = monumentId ? Number(monumentId) : '';
    this.pagination.currentPage = 1;

    if (!this.currentMarkId) return;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { monumentId, page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  toggleBookmark(): void {
    if (!this.currentMarkId) return;
    this.bookmarkFacade.toggle(BookmarkDto.TypeEnum.Mark, this.currentMarkId);
  }

  viewOccurrence(occurrenceId: number): void {
    this.router.navigate(['marks/occurrence', occurrenceId]);
  }

  viewMonument(monumentId: number): void {
    this.router.navigate(['/monuments', monumentId]);
  }

  openReportModal(): void {
    if (!this.currentMarkId) return;

    this.markService.getMark(this.currentMarkId).subscribe(mark => {
      if (!mark) return;

      this.reportFacade.open({
        targetId: mark.id!,
        targetType: 'MARK',
        targetName: mark.description ?? ''
      });
    });
  }

  handleReportSubmit(report: ReportRequestDto): void {
    this.reportFacade.submit(report);
  }

  protected readonly Number = Number;
}
