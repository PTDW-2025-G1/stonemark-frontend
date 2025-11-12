import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonumentService } from '../../../../projects/shared/src/lib/core/services/monument.service';
import { MarkService } from '../../../../projects/shared/src/lib/core/services/mark.service';
import { Monument } from '../../../../projects/shared/src/lib/core/models/monument.model';
import { Mark } from '../../../../projects/shared/src/lib/core/models/mark.model';
import { Observable, of, switchMap } from 'rxjs';
import {CommonModule} from '@angular/common';
import {SearchHeaderComponent} from '@features/search/sections/search-header/search-header';
import {SearchFiltersComponent} from '@features/search/sections/search-filters/search-filters';
import {SearchResultsComponent} from '@features/search/sections/search-results/search-results';
import {SearchPaginationComponent} from '@features/search/sections/search-pagination/search-pagination';

@Component({
  selector: 'app-search',
  imports: [CommonModule, SearchHeaderComponent, SearchFiltersComponent, SearchResultsComponent, SearchPaginationComponent],
  templateUrl: './search.html'
})
export class SearchComponent implements OnInit {
  type: 'monuments' | 'marks' = 'monuments';
  title = '';
  items$: Observable<(Monument | Mark)[]> = of([]);

  filters: any = {};

  currentPage = 1;
  totalPages = 1;

  constructor(
    private route: ActivatedRoute,
    private monumentService: MonumentService,
    private markService: MarkService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.items$ = this.route.paramMap.pipe(
      switchMap(params => {
        const type = params.get('type') as 'monuments' | 'marks' || 'monuments';
        this.type = type;
        this.title = this.getTitle(type);
        this.filters = this.getFiltersForType(type);

        this.cdr.detectChanges();

        return type === 'marks'
          ? this.markService.getLastMarks()
          : this.monumentService.getPopularMonuments();
      })
    );
  }

  private getTitle(type: string): string {
    switch (type) {
      case 'marks': return 'Stone Marks';
      case 'monuments': return 'Historic Monuments';
      default: return 'Search Results';
    }
  }

  private getFiltersForType(type: 'monuments' | 'marks') {
    if (type === 'marks') {
      return {
        monument: true,
      };
    }

    return {
      location: true,
      period: true,
      artist: true,
      material: true,
      architect: true,
      startDate: true,
    };
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

}
