import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonumentService } from '@core/services/monument.service';
import { MarkService } from '@core/services/mark.service';
import { Monument } from '@core/models/monument.model';
import { Mark } from '@core/models/mark.model';
import { Observable, of, switchMap } from 'rxjs';
import {CommonModule} from '@angular/common';
import {SearchHeaderComponent} from '@features/search/sections/search-header/search-header';
import {SearchResultsComponent} from '@features/search/sections/search-results/search-results';
import {SearchPaginationComponent} from '@features/search/sections/search-pagination/search-pagination';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  imports: [CommonModule, SearchHeaderComponent, SearchResultsComponent, SearchPaginationComponent],
  templateUrl: './search.html'
})
export class SearchComponent implements OnInit {
  type: 'monuments' | 'marks' = 'monuments';
  title = '';
  items$: Observable<(Monument | Mark)[]> = of([]);

  currentPage = 1;
  totalPages = 1;

  constructor(
    private route: ActivatedRoute,
    private monumentService: MonumentService,
    private markService: MarkService,
    private cdr: ChangeDetectorRef,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.items$ = this.route.paramMap.pipe(
      switchMap(params => {
        const type = params.get('type') as 'monuments' | 'marks' || 'monuments';
        this.type = type;
        this.title = this.getTitle(type);

        this.titleService.setTitle(`${this.title} - StoneMark`);

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

  onPageChange(page: number) {
    this.currentPage = page;
  }

}
