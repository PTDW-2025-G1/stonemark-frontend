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
import { OccurrencesGridComponent } from '@features/marks/mark-detail/sections/occurrences-grid';
import { EmptyStateComponent } from '@features/marks/mark-detail/sections/empty-state';
import { InfoBoxComponent } from '@features/marks/mark-detail/sections/info-box';

@Component({
  selector: 'app-mark-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbComponent,
    LoadingStateComponent,
    MarkHeaderComponent,
    OccurrencesGridComponent,
    EmptyStateComponent,
    InfoBoxComponent
  ],
  templateUrl: './mark-detail.html'
})
export class MarkDetailComponent implements OnInit {

  markOccurrence$!: Observable<MarkOccurrenceDto>;

  occurrences: MarkOccurrenceDto[] = [];

  breadcrumbItems$!: Observable<BreadcrumbItem[]>;
  loading = true;

  uniqueMonumentsCount = 0;
  bookmarksCount = 0;
  isBookmarked = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private markOccurrenceService: MarkOccurrenceService
  ) {}

  ngOnInit(): void {
    this.markOccurrence$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        this.loadOccurrences(id);
        return this.markOccurrenceService.getById(id);
      }),
      tap(mainOccurrence => {
        if (mainOccurrence?.mark?.title) {
          this.titleService.setTitle(`${mainOccurrence.mark.title}`);
        }
      })
    );

    this.breadcrumbItems$ = this.markOccurrence$.pipe(
      map(mainOccurrence => {
        const items: BreadcrumbItem[] = [
          { label: 'Marks', link: '/search/marks', icon: 'bi bi-grid-3x3-gap' }
        ];
        if (mainOccurrence) {
          items.push(
            { label: mainOccurrence.mark?.title || 'Mark', link: ['/marks', mainOccurrence.mark?.id], active: true }
          );
        }
        return items;
      })
    );
  }

  private loadOccurrences(markId: number): void {
    this.loading = true;

    this.markOccurrenceService.getByMarkId(markId).subscribe({
      next: list => {
        this.occurrences = list ?? [];
        this.uniqueMonumentsCount = new Set(list?.map(o => o.monument?.id).filter(Boolean)).size;
        this.loading = false;
      },
      error: err => {
        console.error('Error loading occurrences:', err);
        this.loading = false;
      }
    });
  }

  toggleBookmark(): void {
    this.isBookmarked = !this.isBookmarked;
  }

  viewOccurrence(occurrenceId: number): void {
    this.router.navigate(['marks/occurrence', occurrenceId]);
  }

  viewMonument(monumentId: number): void {
    this.router.navigate(['/monuments', monumentId]);
  }
}
