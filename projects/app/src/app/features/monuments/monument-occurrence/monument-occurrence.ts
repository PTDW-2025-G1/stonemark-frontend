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
import {InfoBoxComponent} from '@features/marks/mark-detail/sections/info-box';

@Component({
  selector: 'app-monument-occurrence',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent, OccurrencesGridComponent, PaginationComponent, InfoBoxComponent],
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

  private loadOccurrences(monumentId: number, page: number = 0): void {
    this.loading = true;

    this.markOccurrenceService.getByMonumentId(monumentId, page, this.pageSize).subscribe({
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
      this.loadOccurrences(this.currentMonumentId, page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  viewOccurrence(occurrenceId: number): void {
    this.router.navigate(['marks/occurrence', occurrenceId]);
  }

  viewMonument(monumentId: number): void {
    this.router.navigate(['/monuments', monumentId]);
  }

  backToMonument(): void {
    if (this.currentMonumentId != null) {
      this.router.navigate(['/monuments', this.currentMonumentId]);
    }
  }
}

