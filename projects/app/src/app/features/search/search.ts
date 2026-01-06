import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonumentService } from '@core/services/monument/monument.service';
import { MarkService } from '@core/services/mark/mark.service';
import { CommonModule } from '@angular/common';
import { SearchHeaderComponent } from '@features/search/sections/search-header/search-header';
import { SearchPaginationComponent } from '@features/search/sections/search-pagination/search-pagination';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import {SearchResultsComponent} from '@features/search/sections/search-results/search-results';
import {PaginationFacade} from '@shared/facades/pagination.facade';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, SearchHeaderComponent, SearchPaginationComponent, SearchResultsComponent],
  templateUrl: './search.html'
})
export class SearchComponent implements OnInit {

  type: 'monuments' | 'marks' = 'monuments';
  title = '';

  items$ = new BehaviorSubject<any[]>([]);

  searchQuery = '';
  selectedCity = '';

  totalElements = 0;
  pageSize = 9;

  constructor(
    private route: ActivatedRoute,
    private monumentService: MonumentService,
    private markService: MarkService,
    private titleService: Title,
    private router: Router,
    public pagination: PaginationFacade
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const type = (params.get('type') as 'monuments' | 'marks') || 'monuments';
      this.type = type;
      this.title = this.getTitle(type);
      this.titleService.setTitle(`${this.title} - StoneMark`);

      this.route.queryParamMap.subscribe(queryParams => {
        const page = +(queryParams.get('page') || 1);
        this.pagination.setServerPage(page, this.pagination.totalPages);

        const city = queryParams.get('city') || '';
        this.searchQuery = queryParams.get('query') || '';

        if (city && this.type === 'monuments') {
          this.onFilterChange(city);
          this.selectedCity = city;
        } else {
          this.loadData();
        }
      });
    });
  }

  private loadData(): void {
    const pageIndex = this.pagination.currentPage - 1;

    if (this.type === 'marks') {
      const source = this.searchQuery.trim()
        ? this.markService.searchMarks(this.searchQuery, pageIndex, this.pageSize)
        : this.markService.getMarks(pageIndex, this.pageSize);

      source.subscribe(page => {
        this.items$.next(page.content ?? []);

        this.pagination.setServerPage(
          (page.number ?? 0) + 1,
          page.totalPages ?? 1
        );
      });
    } else {
      const source = this.searchQuery.trim()
        ? this.monumentService.searchMonuments(this.searchQuery, pageIndex, this.pageSize)
        : this.monumentService.getMonuments(pageIndex, this.pageSize);

      source.subscribe(page => {
        this.items$.next(page.content ?? []);
        this.pagination.setServerPage(
          (page.number ?? 0) + 1,
          page.totalPages ?? 1
        );
      });
    }
  }

  private getTitle(type: string): string {
    switch (type) {
      case 'marks': return 'shared-links.marks_title';
      case 'monuments': return 'shared-links.monuments';
      default: return 'shared-links.discover';
    }
  }

  onFilterChange(city: string): void {
    this.pagination.setServerPage(1, this.pagination.totalPages);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { city, page: 1 },
      queryParamsHandling: 'merge'
    });

    this.monumentService.filterByCity(city, 0, this.pageSize)
      .subscribe({
        next: (response) => {
          this.items$.next(response.content ?? []);
          this.pagination.setServerPage(1, response.totalPages ?? 1);
          this.totalElements = response.totalElements ?? 0;
        },
        error: () => {
          this.items$.next([]);
        }
      });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.pagination.currentPage = 1;
    this.loadData();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query, page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.pagination.totalPages) return;

    this.pagination.goToPage(page);
    this.loadData();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }
}
