import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonumentService } from '@core/services/monument/monument.service';
import { MarkService } from '@core/services/mark/mark.service';
import { CommonModule } from '@angular/common';
import { SearchHeaderComponent } from '@features/search/sections/search-header/search-header';
import { SearchPaginationComponent } from '@features/search/sections/search-pagination/search-pagination';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import {SearchResultsComponent} from '@features/search/sections/search-results/search-results';
import {PaginationFacade} from '@shared/facades/pagination.facade';
import { LanguageService } from '@core/services/language/language.service';
import { AdministrativeDivisionService } from '@core/services/administrative-division.service';
import { AdministrativeDivisionDto } from '@api/model/administrative-division-dto';
import { switchMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, SearchHeaderComponent, SearchPaginationComponent, SearchResultsComponent],
  templateUrl: './search.html'
})
export class SearchComponent implements OnInit, OnDestroy {

  type: 'monuments' | 'marks' = 'monuments';
  title = '';

  items$ = new BehaviorSubject<any[]>([]);

  districts$ = new BehaviorSubject<AdministrativeDivisionDto[]>([]);
  municipalities$ = new BehaviorSubject<AdministrativeDivisionDto[]>([]);
  parishes$ = new BehaviorSubject<AdministrativeDivisionDto[]>([]);

  searchQuery = '';

  selectedDistrictId: number | null = null;
  selectedMunicipalityId: number | null = null;
  selectedParishId: number | null = null;

  totalElements = 0;
  pageSize = 9;

  private restoreStateSubscription?: Subscription;

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
        if (this.restoreStateSubscription) {
            this.restoreStateSubscription.unsubscribe();
            this.restoreStateSubscription = undefined;
        }

        const page = +(queryParams.get('page') || 1);
        this.pagination.currentPage = page;

        const divisionId = queryParams.get('divisionId');
        this.searchQuery = queryParams.get('query') || '';

        const districtId = queryParams.get('districtId');
        const municipalityId = queryParams.get('municipalityId');
        const parishId = queryParams.get('parishId');

        if (districtId || municipalityId || parishId) {
            if (districtId) {
                this.selectedDistrictId = +districtId;
                this.loadMunicipalities(+districtId);
            } else {
                this.selectedDistrictId = null;
                this.municipalities$.next([]);
            }

            if (municipalityId) {
                this.selectedMunicipalityId = +municipalityId;
                this.loadParishes(+municipalityId);
            } else {
                this.selectedMunicipalityId = null;
                this.parishes$.next([]);
            }

            this.selectedParishId = parishId ? +parishId : null;
        } else if (divisionId) {
          const id = +divisionId;
          const isStateMatching =
            (id === this.selectedParishId && this.selectedMunicipalityId && this.selectedDistrictId) ||
            (id === this.selectedMunicipalityId && this.selectedDistrictId && !this.selectedParishId) ||
            (id === this.selectedDistrictId && !this.selectedMunicipalityId && !this.selectedParishId);

          if (!isStateMatching) {
            this.restoreStateSubscription = this.restoreDivisionState(id);
          }
        } else {
            this.resetDivisionState();
        }

        this.loadData(divisionId ? +divisionId : null);
      });
    });
  }

  ngOnDestroy(): void {
      if (this.restoreStateSubscription) {
          this.restoreStateSubscription.unsubscribe();
      }
  }

  private loadDistricts(): void {
    this.divisionService.getDistricts().subscribe(districts => {
      this.districts$.next(districts);
    });
  }

  private loadMunicipalities(districtId: number): void {
    this.divisionService.getMunicipalitiesByDistrict(districtId).subscribe(municipalities => {
      this.municipalities$.next(municipalities);
    });
  }

  private loadParishes(municipalityId: number): void {
    this.divisionService.getParishesByMunicipality(municipalityId).subscribe(parishes => {
      this.parishes$.next(parishes);
    });
  }

  private resetDivisionState(): void {
      this.selectedDistrictId = null;
      this.selectedMunicipalityId = null;
      this.selectedParishId = null;
      this.municipalities$.next([]);
      this.parishes$.next([]);
  }

  private restoreDivisionState(divisionId: number): Subscription {
    return this.divisionService.getDivisionById(divisionId).pipe(
        switchMap(division => {
            if (division.adminLevel === 8) { // Parish
                this.selectedParishId = division.id!;
                return this.divisionService.getMunicipalityByParish(division.id!).pipe(
                    switchMap(municipality => {
                        this.selectedMunicipalityId = municipality.id!;
                        this.loadParishes(municipality.id!);
                        return this.divisionService.getDistrictByMunicipality(municipality.id!).pipe(
                            map(district => {
                                this.selectedDistrictId = district.id!;
                                this.loadMunicipalities(district.id!);
                            })
                        );
                    })
                );
            } else if (division.adminLevel === 7) { // Municipality
                this.selectedMunicipalityId = division.id!;
                this.selectedParishId = null;
                this.loadParishes(division.id!);
                return this.divisionService.getDistrictByMunicipality(division.id!).pipe(
                    map(district => {
                        this.selectedDistrictId = district.id!;
                        this.loadMunicipalities(district.id!);
                    })
                );
            } else if (division.adminLevel === 6) { // District
                this.selectedDistrictId = division.id!;
                this.selectedMunicipalityId = null;
                this.selectedParishId = null;
                this.loadMunicipalities(division.id!);
                return of(null);
            }
            return of(null);
        }),
        catchError(() => {
            // If error resolving hierarchy, just reset
            this.resetDivisionState();
            return of(null);
        })
    ).subscribe();
  }

  private loadData(divisionId: number | null): void {
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

      if (divisionId) {
          source = this.monumentService.filterByDivision(divisionId, pageIndex, this.pageSize);
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

  onDistrictChange(districtId: number | null): void {
    this.selectedDistrictId = districtId;
    this.selectedMunicipalityId = null;
    this.selectedParishId = null;
    this.municipalities$.next([]);
    this.parishes$.next([]);

    if (districtId) {
        this.loadMunicipalities(districtId);
        this.updateRoute(districtId);
    } else {
        this.updateRoute(null);
    }
  }

  onMunicipalityChange(municipalityId: number | null): void {
    this.selectedMunicipalityId = municipalityId;
    this.selectedParishId = null;
    this.parishes$.next([]);

    if (municipalityId) {
        this.loadParishes(municipalityId);
        this.updateRoute(municipalityId);
    } else {
        // Fallback to district
        this.updateRoute(this.selectedDistrictId);
    }
  }

  onParishChange(parishId: number | null): void {
    this.selectedParishId = parishId;

    if (parishId) {
        this.updateRoute(parishId);
    } else {
        // Fallback to municipality
        this.updateRoute(this.selectedMunicipalityId);
    }
  }

  private updateRoute(divisionId: number | null): void {
    const queryParams: any = {
      divisionId,
      page: 1,
      query: null,
      districtId: this.selectedDistrictId || null,
      municipalityId: this.selectedMunicipalityId || null,
      parishId: this.selectedParishId || null
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  onSearch(query: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
          query,
          page: 1,
          divisionId: null,
          districtId: null,
          municipalityId: null,
          parishId: null
      },
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
