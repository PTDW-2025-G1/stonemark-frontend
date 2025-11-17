import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import { MarkService } from '@core/services/mark.service';
import { Mark } from '@core/models/mark.model';
import { MarkOccurrence } from '@core/models/mark.occurence.model';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/ui/breadcrumb/breadcrumb';
import {LoadingStateComponent} from '@features/marks/mark-occurrences/sections/loading-state';
import {MarkHeaderComponent} from '@features/marks/mark-occurrences/sections/mark-header';
import {OccurrencesGridComponent} from '@features/marks/mark-occurrences/sections/occurrences-grid';
import {EmptyStateComponent} from '@features/marks/mark-occurrences/sections/empty-state';
import {InfoBoxComponent} from '@features/marks/mark-occurrences/sections/info-box';

@Component({
  selector: 'app-mark-occurrences',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent, LoadingStateComponent, MarkHeaderComponent, OccurrencesGridComponent, EmptyStateComponent, InfoBoxComponent],
  templateUrl: './mark-occurrences.html'
})
export class MarkOccurrencesComponent implements OnInit {
  mark$!: Observable<Mark | undefined>;
  breadcrumbItems$!: Observable<BreadcrumbItem[]>;
  occurrences: MarkOccurrence[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private markService: MarkService
  ) {}

  ngOnInit(): void {
    this.mark$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        this.loadOccurrences(id);
        return this.markService.getMarkById(id);
      })
    );
    this.breadcrumbItems$ = this.mark$.pipe(
      map(mark => {
        const items: BreadcrumbItem[] = [
          { label: 'Marks', link: '/marks', icon: 'bi bi-grid-3x3-gap' }
        ];
        if (mark) {
          items.push(
            { label: mark.title, link: ['/marks', mark.id] },
            { label: 'Occurrences', icon: 'bi bi-collection-fill', active: true }
          );
        }
        return items;
      })
    );
  }

  loadOccurrences(markId: number): void {
    this.loading = true;
    this.markService.getOccurrencesByMarkId(markId).subscribe({
      next: (occurrences) => {
        this.occurrences = occurrences;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading occurrences:', err);
        this.loading = false;
      }
    });
  }

  viewOccurrence(occurrenceId: number): void {
    console.log('View occurrence:', occurrenceId);
    this.router.navigate(['/occurrences', occurrenceId]);
  }

  viewMonument(monumentId: number): void {
    this.router.navigate(['/monuments', monumentId]);
  }
}
