import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, tap, switchMap, map, distinctUntilChanged } from 'rxjs';
import { Title } from '@angular/platform-browser';
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
import { MarkOccurrencesFacade } from '@shared/facades/mark-occurrences.facade';


@Component({
  selector: 'app-mark-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent, LoadingStateComponent, MarkHeaderComponent, OccurrencesGridComponent, EmptyStateComponent, InfoBoxComponent, PaginationComponent, FiltersComponent, ReportModalComponent],
  templateUrl: './mark-detail.html'
})
export class MarkDetailComponent implements OnInit {
  mark$!: Observable<MarkDto>;
  breadcrumbItems$!: Observable<BreadcrumbItem[]>;
  occurrencesCount = 0;
  uniqueMonumentsCount = 0;
  monuments: MonumentResponseDto[] = [];
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
    public occurrencesFacade: MarkOccurrencesFacade
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const markId = Number(params.get('id'));
      this.currentMarkId = markId;

      this.occurrencesFacade.reset();
      this.bookmarkFacade.init(BookmarkDto.TypeEnum.Mark, markId);
      this.loadMonuments(markId);

      this.markOccurrenceService.countByMarkId(markId)
        .subscribe(count => this.occurrencesCount = count);

      this.markOccurrenceService.countMonumentsByMarkId(markId)
        .subscribe(count => this.uniqueMonumentsCount = count);
    });

    this.route.queryParamMap.pipe(
      map(queryParams => ({
        page: +(queryParams.get('page') || 1),
        monumentId: queryParams.get('monumentId') ? Number(queryParams.get('monumentId')) : null,
        sort: (queryParams.get('sort') || 'desc') as 'asc' | 'desc'
      })),
      distinctUntilChanged((prev, curr) =>
        prev.page === curr.page &&
        prev.monumentId === curr.monumentId &&
        prev.sort === curr.sort
      )
    ).subscribe(params => {
      if (!this.currentMarkId) return;

      this.occurrencesFacade.pagination.currentPage = params.page;
      this.occurrencesFacade.setMonumentFilter(params.monumentId);
      this.occurrencesFacade.setSort(params.sort);

      this.occurrencesFacade.loadByMark(this.currentMarkId);
    });

    this.mark$ = this.route.paramMap.pipe(
      switchMap(params => {
        const markId = Number(params.get('id'));
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

  onPageChange(page: number): void {
    if (!this.currentMarkId) return;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }

  onSortChange(sort: string | number): void {
    if (!this.currentMarkId) return;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: String(sort), page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  onMonumentFilterChange(monumentId: string | number): void {
    if (!this.currentMarkId) return;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { monumentId: monumentId || null, page: 1 },
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
