import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';
import { PaginationFacade } from '@shared/facades/pagination.facade';
import { PageMarkOccurrenceDto } from '@api/model/page-mark-occurrence-dto';
import {MarkOccurrenceListDto} from '@api/model/mark-occurrence-list-dto';

@Injectable({ providedIn: 'root' })
export class MarkOccurrencesFacade {

  occurrences: MarkOccurrenceDto[] = [];
  loading = false;

  pageSize = 6;
  selectedSort: 'asc' | 'desc' = 'desc';

  selectedMonumentId: number | null = null;
  selectedMarkId: number | null = null;

  constructor(
    private service: MarkOccurrenceService,
    public pagination: PaginationFacade<MarkOccurrenceListDto>
  ) {}

  loadByMark(markId: number): void {
    this.fetch(
      this.selectedMonumentId
        ? this.service.filterByMarkAndMonument(
          markId,
          this.selectedMonumentId,
          this.pagination.currentPage - 1,
          this.pageSize,
          this.selectedSort
        )
        : this.service.getByMarkId(
          markId,
          this.pagination.currentPage - 1,
          this.pageSize,
          this.selectedSort
        )
    );
  }

  loadByMonument(monumentId: number): void {
    this.fetch(
      this.selectedMarkId
        ? this.service.filterByMarkAndMonument(
          this.selectedMarkId,
          monumentId,
          this.pagination.currentPage - 1,
          this.pageSize,
          this.selectedSort
        )
        : this.service.getByMonumentId(
          monumentId,
          this.pagination.currentPage - 1,
          this.pageSize,
          this.selectedSort
        )
    );
  }

  private fetch(request$: Observable<PageMarkOccurrenceDto>): void {
    this.loading = true;

    request$.subscribe({
      next: page => {
        this.occurrences = page.content ?? [];

        this.pagination.setServerPage(
          (page.number ?? 0) + 1,
          page.totalPages ?? 1
        );

        this.loading = false;
      },
      error: () => {
        this.occurrences = [];
        this.pagination.setServerPage(1, 1);
        this.loading = false;
      }
    });
  }

  setSort(sort: 'asc' | 'desc'): void {
    this.selectedSort = sort;
  }

  setMonumentFilter(id: number | null): void {
    this.selectedMonumentId = id;
  }

  setMarkFilter(id: number | null): void {
    this.selectedMarkId = id;
  }

  reset(): void {
    this.selectedMarkId = null;
    this.selectedMonumentId = null;
    this.pagination.currentPage = 1;
    this.occurrences = [];
    this.loading = false;
  }
}
