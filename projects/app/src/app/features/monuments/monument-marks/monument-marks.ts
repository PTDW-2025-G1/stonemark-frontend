import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, switchMap, tap, map } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';
import { MonumentService } from '@core/services/monument/monument.service';
import { MonumentResponseDto } from '@api/model/monument-response-dto';
import { MONUMENTS_ICON, MARKS_ICON } from '@core/constants/content-icons';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/ui/breadcrumb/breadcrumb';
import { OccurrencesGridComponent } from '@shared/ui/occurrences-grid/occurrences-grid';
import { PaginationComponent } from '@shared/ui/pagination/pagination';
import { InfoBoxComponent } from '@features/marks/mark-detail/sections/info-box';
import { MarkDto } from '@api/model/mark-dto';
import { ImageUtils } from '@shared/utils/image.utils';
import { FiltersComponent } from '@shared/ui/filters/filters';
import { PaginationFacade } from '@shared/facades/pagination.facade';

@Component({
  selector: 'app-monument-marks',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent, OccurrencesGridComponent, PaginationComponent, InfoBoxComponent, FiltersComponent],
  templateUrl: './monument-marks.html'
})
export class MonumentMarksComponent implements OnInit {
  monument$!: Observable<MonumentResponseDto | undefined>;
  occurrences: MarkOccurrenceDto[] = [];
  breadcrumbItems$!: Observable<BreadcrumbItem[]>;
  loading = true;
  occurrencesCount = 0;
  pageSize = 6;
  selectedSort = 'desc';

  marks: MarkDto[] = [];
  selectedMarkId: number | string = '';

  marksIcon = MARKS_ICON;

  private currentMonumentId?: number;

  get formattedMarks() {
    return this.marks.map(mark => ({
      ...mark,
      displayLabel: `Mark #${mark.id}`
    }));
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private monumentService: MonumentService,
    private markOccurrenceService: MarkOccurrenceService,
    public pagination: PaginationFacade<MarkOccurrenceDto>
  ) { }

  ngOnInit(): void {
    this.monument$ = this.route.paramMap.pipe(
      switchMap(params => {
        const monumentId = Number(params.get('id'));
        this.currentMonumentId = monumentId;
        this.loadMarks(monumentId);

        this.route.queryParamMap.subscribe(queryParams => {
          this.pagination.currentPage = +(queryParams.get('page') || 1);
          this.selectedMarkId = queryParams.get('markId') ? Number(queryParams.get('markId')) : '';
          this.selectedSort = queryParams.get('sort') || 'desc';
          this.loadOccurrences(monumentId, this.pagination.currentPage - 1);
        });

        this.markOccurrenceService.countByMonumentId(monumentId).subscribe(count => {
          this.occurrencesCount = count;
        });

        return this.monumentService.getMonumentById(monumentId);
      }),
      tap(monument => {
        if (monument?.name) {
          this.titleService.setTitle(`${monument.name} - Mason Marks`);
        }
      })
    );

    this.breadcrumbItems$ = this.monument$.pipe(
      map(monument => [
        { label: 'Monuments', link: '/search/monuments', iconHtml: MONUMENTS_ICON },
        { label: monument?.name ?? 'Monument', link: ['/monuments', monument?.id] },
        { label: 'Mason Marks', link: [], active: true, iconHtml: MARKS_ICON }
      ])
    );
  }

  private loadMarks(monumentId: number): void {
    this.markOccurrenceService.getAvailableMarksByMonument(monumentId).subscribe({
      next: marks => {
        this.marks = marks;
      },
      error: err => {
        console.error('Error loading marks for filter:', err);
      }
    });
  }

  private loadOccurrences(monumentId: number, page: number = 0): void {
    this.loading = true;

    const request$ = this.selectedMarkId
      ? this.markOccurrenceService.filterByMarkAndMonument(
        Number(this.selectedMarkId),
        monumentId,
        page,
        this.pageSize,
        this.selectedSort
      )
      : this.markOccurrenceService.getByMonumentId(
        monumentId,
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
    if (!this.currentMonumentId) return;

    this.pagination.goToPage(page);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }

  onSortChange(sort: 'asc' | 'desc') {
    this.selectedSort = sort;
    this.pagination.currentPage = 1;
    if (this.currentMonumentId != null) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { sort, page: 1 },
        queryParamsHandling: 'merge'
      });
    }
  }


  onMarkFilterChange(markId: string | number): void {
    this.selectedMarkId = markId ? Number(markId) : '';
    this.pagination.currentPage = 1;
    if (this.currentMonumentId != null) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { markId, page: 1 },
        queryParamsHandling: 'merge'
      });
    }
  }

  viewOccurrence(occurrenceId: number): void {
    this.router.navigate(['marks/occurrence', occurrenceId]);
  }

  viewMark(markId: number): void {
    this.router.navigate(['/marks', markId]);
  }

  backToMonument(): void {
    if (this.currentMonumentId != null) {
      this.router.navigate(['/monuments', this.currentMonumentId]);
    }
  }

  captureMark(): void {
    this.router.navigate(['/submit'])
  }

  getImageUrl(monument: MonumentResponseDto): string {
    return ImageUtils.getImageUrl(monument.coverId, 'assets/placeholder.png');
  }
}
