import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, switchMap, tap, map, distinctUntilChanged } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { MarkOccurrenceService } from '@core/services/mark-occurrence/mark-occurrence.service';
import { MonumentService } from '@core/services/monument/monument.service';
import { MonumentDto } from '@api/model/monument-dto';
import { MONUMENTS_ICON, MARKS_ICON } from '@core/constants/content-icons';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/ui/breadcrumb/breadcrumb';
import { OccurrencesGridComponent } from '@shared/ui/occurrences-grid/occurrences-grid';
import { PaginationComponent } from '@shared/ui/pagination/pagination';
import { InfoBoxComponent } from '@features/marks/mark-detail/sections/info-box';
import { MarkDto } from '@api/model/mark-dto';
import { ImageUtils, ImageVariant } from '@shared/utils/image.utils';
import { FiltersComponent } from '@shared/ui/filters/filters';
import { MarkOccurrencesFacade } from '@shared/facades/mark-occurrences.facade';

@Component({
  selector: 'app-monument-marks',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent, OccurrencesGridComponent, PaginationComponent, InfoBoxComponent, FiltersComponent],
  templateUrl: './monument-marks.html'
})
export class MonumentMarksComponent implements OnInit {
  monument$!: Observable<MonumentDto | undefined>;
  breadcrumbItems$!: Observable<BreadcrumbItem[]>;
  occurrencesCount = 0;

  marks: MarkDto[] = [];
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
    public occurrencesFacade: MarkOccurrencesFacade
  ) { }

  ngOnInit(): void {
    this.monument$ = this.route.paramMap.pipe(
      switchMap(params => {
        const monumentId = Number(params.get('id'));
        this.currentMonumentId = monumentId;

        this.occurrencesFacade.reset();
        this.loadMarks(monumentId);

        this.route.queryParamMap.pipe(
          map(queryParams => ({
            page: +(queryParams.get('page') || 1),
            markId: queryParams.get('markId') ? Number(queryParams.get('markId')) : null,
            sort: (queryParams.get('sort') || 'desc') as 'asc' | 'desc'
          })),
          distinctUntilChanged((prev, curr) =>
            prev.page === curr.page &&
            prev.markId === curr.markId &&
            prev.sort === curr.sort
          )
        ).subscribe(params => {
          console.log('📋 Query params changed - page:', params.page, 'markId:', params.markId, 'sort:', params.sort);

          this.occurrencesFacade.pagination.currentPage = params.page;
          this.occurrencesFacade.setMarkFilter(params.markId);
          this.occurrencesFacade.setSort(params.sort);

          this.occurrencesFacade.loadByMonument(monumentId);
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

  onPageChange(page: number): void {
    if (!this.currentMonumentId) return;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }

  onSortChange(sort: string | number): void {
    if (!this.currentMonumentId) return;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: String(sort), page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  onMarkFilterChange(markId: string | number): void {
    if (!this.currentMonumentId) return;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { markId: markId || null, page: 1 },
      queryParamsHandling: 'merge'
    });
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

  getImageUrl(monument: MonumentDto): string {
    return ImageUtils.getImageUrl(monument.coverId, 'assets/placeholder.png', ImageVariant.PREVIEW);
  }
}
