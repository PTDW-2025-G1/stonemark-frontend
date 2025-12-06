import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, tap, switchMap, map } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';

import { BreadcrumbComponent, BreadcrumbItem } from '@shared/ui/breadcrumb/breadcrumb';
import { LoadingStateComponent } from '@features/marks/mark-occurrences/sections/loading-state';
import { MarkHeaderComponent } from '@features/marks/mark-occurrences/sections/mark-header';
import { OccurrencesGridComponent } from '@features/marks/mark-occurrences/sections/occurrences-grid';
import { EmptyStateComponent } from '@features/marks/mark-occurrences/sections/empty-state';
import { InfoBoxComponent } from '@features/marks/mark-occurrences/sections/info-box';

@Component({
  selector: 'app-mark-occurrences',
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
  templateUrl: './mark-occurrences.html'
})
export class MarkOccurrencesComponent implements OnInit {

  /** A ocorrência principal da marca (para título e header) */
  markOccurrence$!: Observable<MarkOccurrenceDto>;

  /** Lista completa de occurrences da mesma marca */
  occurrences: MarkOccurrenceDto[] = [];

  breadcrumbItems$!: Observable<BreadcrumbItem[]>;
  loading = true;

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

        // Load occurrences of the same mark
        this.loadOccurrences(id);

        // Load main occurrence to show header & title
        return this.markOccurrenceService.getById(id);
      }),
      tap(mainOccurrence => {
        if (mainOccurrence?.mark?.title) {
          this.titleService.setTitle(`${mainOccurrence.mark.title} - Mark Occurrences`);
        }
      })
    );

    this.breadcrumbItems$ = this.markOccurrence$.pipe(
      map(mainOccurrence => {
        const items: BreadcrumbItem[] = [
          { label: 'Marks', link: '/marks', icon: 'bi bi-grid-3x3-gap' }
        ];

        if (mainOccurrence) {
          items.push(
            { label: mainOccurrence.mark?.title || 'Mark', link: ['/marks', mainOccurrence.mark?.id] },
            { label: 'Occurrences', icon: 'bi bi-collection-fill', active: true }
          );
        }

        return items;
      })
    );
  }

  /** Load ALL occurrences from the same mark */
  private loadOccurrences(markId: number): void {
    this.loading = true;

    this.markOccurrenceService.getByMarkId(markId).subscribe({
      next: list => {
        this.occurrences = list ?? [];
        this.loading = false;
      },
      error: err => {
        console.error('Error loading occurrences:', err);
        this.loading = false;
      }
    });
  }

  /** Navigate to a specific occurrence */
  viewOccurrence(occurrenceId: number): void {
    this.router.navigate(['/occurrences', occurrenceId]);
  }

  /** Navigate to the monument */
  viewMonument(monumentId: number): void {
    this.router.navigate(['/monuments', monumentId]);
  }
}
