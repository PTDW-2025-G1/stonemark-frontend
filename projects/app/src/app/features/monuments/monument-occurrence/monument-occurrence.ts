import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, switchMap, tap, map } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';
import { MonumentService } from '@core/services/monument/monument.service';
import { MonumentResponseDto } from '@api/model/monument-response-dto';

import { BreadcrumbComponent, BreadcrumbItem } from '@shared/ui/breadcrumb/breadcrumb';
import { OccurrencesGridComponent } from '@shared/ui/occurrences-grid/occurrences-grid';
import { PaginationComponent } from '@shared/ui/pagination/pagination';
import { SharedSelectComponent } from '@shared/ui/shared-select/shared-select';
import { InfoBoxComponent } from '@features/marks/mark-detail/sections/info-box';
import { MarkDto } from '@api/model/mark-dto';

@Component({
  selector: 'app-monument-occurrence',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent, OccurrencesGridComponent, PaginationComponent, InfoBoxComponent, SharedSelectComponent],
  templateUrl: './monument-occurrence.html'
})
export class MonumentOccurrenceComponent implements OnInit {
  monument$!: Observable<MonumentResponseDto | undefined>;
  occurrences: MarkOccurrenceDto[] = [];
  breadcrumbItems$!: Observable<BreadcrumbItem[]>;
  loading = true;
  occurrencesCount = 0;

  currentPage = 1;
  totalPages = 1;
  pageSize = 6;

  // Filter by mark
  marks: MarkDto[] = [];
  selectedMarkId: number | string = '';

  private currentMonumentId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private monumentService: MonumentService,
    private markOccurrenceService: MarkOccurrenceService
  ) {}

  ngOnInit(): void {
    this.monument$ = this.route.paramMap.pipe(
      switchMap(params => {
        const monumentId = Number(params.get('id'));
        this.currentMonumentId = monumentId;
        this.loadMarks(monumentId);
        this.loadOccurrences(monumentId);

        this.markOccurrenceService.countByMonumentId(monumentId).subscribe(count => {
          this.occurrencesCount = count;
        });

        return this.monumentService.getMonumentById(monumentId);
      }),
      tap(monument => {
        if (monument?.name) {
          this.titleService.setTitle(`${monument.name} - Stone Marks`);
        }
      })
    );

    this.breadcrumbItems$ = this.monument$.pipe(
      map(monument => [
        { label: 'Monuments', link: '/search/monuments', icon: 'bi bi-building' },
        { label: monument?.name ?? 'Monument', link: ['/monuments', monument?.id] },
        { label: 'Stone Marks', link: [], active: true, icon: 'bi bi-grid-3x3-gap' }
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
      ? this.markOccurrenceService.filterByMarkAndMonument(Number(this.selectedMarkId), monumentId, page, this.pageSize)
      : this.markOccurrenceService.getByMonumentId(monumentId, page, this.pageSize);

    request$.subscribe({
      next: pageData => {
        this.occurrences = pageData.content ?? [];
        this.totalPages = pageData.totalPages ?? 1;
        this.currentPage = (pageData.number ?? 0) + 1;
        this.loading = false;
      },
      error: err => {
        console.error('Error loading occurrences:', err);
        this.occurrences = [];
        this.loading = false;
      }
    });
  }

  onPageChange(page: number): void {
    if (this.currentMonumentId != null) {
      this.loadOccurrences(this.currentMonumentId, page - 1); // Convert to 0-based for backend
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onMarkFilterChange(markId: string | number): void {
    this.selectedMarkId = markId;
    this.currentPage = 1;
    if (this.currentMonumentId != null) {
      this.loadOccurrences(this.currentMonumentId, 0);
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
}

