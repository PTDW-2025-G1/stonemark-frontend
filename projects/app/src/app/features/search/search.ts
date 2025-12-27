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

  currentPage = 1;
  totalPages = 1;
  totalElements = 0;
  pageSize = 9;

  constructor(
    private route: ActivatedRoute,
    private monumentService: MonumentService,
    private markService: MarkService,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const type = (params.get('type') as 'monuments' | 'marks') || 'monuments';
      this.type = type;
      this.title = this.getTitle(type);
      this.titleService.setTitle(`${this.title} - StoneMark`);

      this.currentPage = 1;
      this.loadData();
    });
  }

  private loadData(): void {
    const pageIndex = this.currentPage - 1;

    if (this.type === 'marks') {
      const source = this.searchQuery.trim()
        ? this.markService.searchMarks(this.searchQuery, pageIndex, this.pageSize)
        : this.markService.getListMarks(pageIndex, this.pageSize);

      source.subscribe(page => {
        this.items$.next(page.content ?? []);
        this.totalElements = page.totalElements ?? 0;
        this.totalPages = page.totalPages ?? 1;
      });
    } else {
      const source = this.searchQuery.trim()
        ? this.monumentService.searchMonuments(this.searchQuery, pageIndex, this.pageSize)
        : this.monumentService.getListMonuments(pageIndex, this.pageSize);

      source.subscribe(page => {
        this.items$.next(page.content ?? []);
        this.totalElements = page.totalElements ?? 0;
        this.totalPages = page.totalPages ?? 1;
      });
    }
  }

  private getTitle(type: string): string {
    switch (type) {
      case 'marks': return 'Mason Marks';
      case 'monuments': return 'Historic Monuments';
      default: return 'Search Results';
    }
  }

  onFilterChange(city: string): void {
    if (!city?.trim()) {
      this.loadData();
      return;
    }

    this.currentPage = 1;

    this.monumentService.filterByCity(city, 0, this.pageSize)
      .subscribe({
        next: (response) => {
          this.items$.next(response.content ?? []);
          this.totalPages = response.totalPages ?? 0;
          this.totalElements = response.totalElements ?? 0;
        },
        error: (error) => {
          this.items$.next([]);
        }
      });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.currentPage = 1;
    this.loadData();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query, page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadData();

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page },
        queryParamsHandling: 'merge'
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
