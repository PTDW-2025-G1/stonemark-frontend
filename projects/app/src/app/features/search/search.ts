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
import { LanguageService } from '@core/services/language/language.service';
import { AdministrativeDivisionService } from '@core/services/administrative-division.service';
import { AdministrativeDivisionDto } from '@api/model/administrative-division-dto';

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
  districts$ = new BehaviorSubject<AdministrativeDivisionDto[]>([]);

  searchQuery = '';
  selectedDivisionId: number | null = null;

  totalElements = 0;
  pageSize = 9;

  constructor(
    private route: ActivatedRoute,
    private monumentService: MonumentService,
    private markService: MarkService,
    private titleService: Title,
    private router: Router,
    public pagination: PaginationFacade,
    private languageService: LanguageService,
    private divisionService: AdministrativeDivisionService
  ) {}

  ngOnInit(): void {
    this.loadDistricts();

    this.route.paramMap.subscribe(params => {
      const type = (params.get('type') as 'monuments' | 'marks') || 'monuments';
      this.type = type;
      this.title = this.getTitle(type);

      const translatedTitle = this.languageService.instant(this.title);
      this.titleService.setTitle(`${translatedTitle} - StoneMark`);

      this.route.queryParamMap.subscribe(queryParams => {
        const page = +(queryParams.get('page') || 1);
        this.pagination.currentPage = page;

        const divisionId = queryParams.get('divisionId');
        this.searchQuery = queryParams.get('query') || '';

        this.selectedDivisionId = null;

        if (this.type === 'monuments' && divisionId) {
            this.selectedDivisionId = +divisionId;
        }

        this.loadData();
      });
    });
  }

  private loadDistricts(): void {
    this.divisionService.getDistricts().subscribe(districts => {
      this.districts$.next(districts);
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
        this.totalElements = page.totalElements ?? 0;
      });
    } else {
      let source;
      if (this.selectedDivisionId) {
          source = this.monumentService.filterByDivision(this.selectedDivisionId, pageIndex, this.pageSize);
      } else if (this.searchQuery.trim()) {
          source = this.monumentService.searchMonuments(this.searchQuery, pageIndex, this.pageSize);
      } else {
          source = this.monumentService.getMonuments(pageIndex, this.pageSize);
      }

      source.subscribe(page => {
        this.items$.next(page.content ?? []);
        this.pagination.setServerPage(
          (page.number ?? 0) + 1,
          page.totalPages ?? 1
        );
        this.totalElements = page.totalElements ?? 0;
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

  onFilterChange(divisionId: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { divisionId, page: 1, query: null },
      queryParamsHandling: 'merge'
    });
  }

  onSearch(query: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query, page: 1, divisionId: null },
      queryParamsHandling: 'merge'
    });
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.pagination.totalPages) return;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }
}
