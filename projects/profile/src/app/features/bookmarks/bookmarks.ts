import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookmarkService } from '@core/services/bookmark/bookmark.service';
import { MonumentService } from '@core/services/monument/monument.service';
import { MarkService } from '@core/services/mark/mark.service';
import { forkJoin, map } from 'rxjs';
import { BookmarkDto } from '@api/model/bookmark-dto';
import { HeaderSectionComponent } from './sections/header-section';
import { TabsSectionComponent } from './sections/tabs-section';
import { EmptyStateSectionComponent } from './sections/empty-state';
import { GridSectionComponent } from './sections/grid-section';
import { PaginationSectionComponent } from './sections/pagination-section';
import {MarkOccurrenceService} from '@core/services/mark/mark-occurrence.service';
import { environment } from '@env/environment';

type TabType = 'all' | 'monuments' | 'marks';

interface BookmarkItem {
  bookmarkId: number;
  id: number;
  type: 'monument' | 'mark';
  title: string;
  subtitle?: string;
  occurrenceCount?: number;
  coverId?: number;
  city?: string;
}

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderSectionComponent, TabsSectionComponent, EmptyStateSectionComponent, GridSectionComponent, PaginationSectionComponent],
  templateUrl: './bookmarks.html'
})
export class BookmarksComponent implements OnInit {
  activeTab: TabType = 'all';
  bookmarks: BookmarkDto[] = [];
  monuments: BookmarkItem[] = [];
  marks: BookmarkItem[] = [];
  filteredItems: BookmarkItem[] = [];
  paginatedItems: BookmarkItem[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 0;
  Math = Math;

  constructor(
    private bookmarkService: BookmarkService,
    private monumentService: MonumentService,
    private markService: MarkService,
    private markOccurrenceService: MarkOccurrenceService
  ) {}

  ngOnInit(): void {
    this.loadBookmarks();
  }

  private loadBookmarks(): void {
    this.bookmarkService.getUserBookmarks().subscribe(bookmarks => {
      this.bookmarks = bookmarks;
      this.loadBookmarkDetails();
    });
  }

  private loadBookmarkDetails(): void {
    if (!this.bookmarks.length) {
      this.monuments = [];
      this.marks = [];
      this.updateFilteredItems();
      return;
    }
    const requests = this.bookmarks.map(b => {
      if (b.type === BookmarkDto.TypeEnum.Monument) {
        return this.monumentService.getMonumentById(b.targetId!).pipe(
          map(m => ({
            bookmarkId: b.id!,
            id: m.id!,
            type: 'monument' as const,
            title: m.name ?? 'Unknown Monument',
            subtitle: m.city ? `${m.city}, Portugal` : 'Portugal',
            coverId: m.coverId,
            city: m.city
          }))
        );
      } else {
        return this.markService.getMark(b.targetId!).pipe(
          map(mark => ({ bookmarkId: b.id!, id: mark.id!, type: 'mark' as const, title: '', coverId: mark.coverId })),
        );
      }
    });

    forkJoin(requests).subscribe(items => {
      const markItems = items.filter(i => i.type === 'mark');
      if (markItems.length) {
        forkJoin(
          markItems.map(item =>
            this.markOccurrenceService.countByMarkId(item.id).pipe(
              map(count => ({
                ...item,
                occurrenceCount: count,
                subtitle: `Portugal · ${count} occurrence${count === 1 ? '' : 's'}`
              }))
            )
          )
        ).subscribe(markItemsWithCount => {
          this.monuments = items.filter(i => i.type === 'monument');
          this.marks = markItemsWithCount;
          this.updateFilteredItems();
        });
      } else {
        this.monuments = items.filter(i => i.type === 'monument');
        this.marks = [];
        this.updateFilteredItems();
      }
    });
  }

  changeTab(tab: TabType): void {
    this.activeTab = tab;
    this.currentPage = 1;
    this.updateFilteredItems();
  }

  updateFilteredItems(): void {
    switch (this.activeTab) {
      case 'all':
        this.filteredItems = [...this.monuments, ...this.marks];
        break;
      case 'monuments':
        this.filteredItems = this.monuments;
        break;
      case 'marks':
        this.filteredItems = this.marks;
        break;
    }
    this.calculatePagination();
    this.updatePaginatedItems();
  }

  removeBookmark(bookmarkId: number, type: 'monument' | 'mark'): void {
    this.bookmarkService.deleteBookmark(bookmarkId).subscribe(() => {
      if (type === 'monument') {
        this.monuments = this.monuments.filter(m => m.bookmarkId !== bookmarkId);
      } else {
        this.marks = this.marks.filter(m => m.bookmarkId !== bookmarkId);
      }
      this.updateFilteredItems();
    });
  }

  viewDetails(item: BookmarkItem): void {
    const route = item.type === 'monument' ? 'monuments' : 'marks';
    window.location.href = `${environment.baseUrl}/${route}/${item.id}`;
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage) || 1;
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  updatePaginatedItems(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedItems = this.filteredItems.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedItems();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (this.currentPage > 3) {
        pages.push(-1); // ellipsis
      }
      const start = Math.max(2, this.currentPage - 1);
      const end = Math.min(this.totalPages - 1, this.currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (this.currentPage < this.totalPages - 2) {
        pages.push(-1); // ellipsis
      }
      pages.push(this.totalPages);
    }
    return pages;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }
}
