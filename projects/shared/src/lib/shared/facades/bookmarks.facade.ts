import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

import { BookmarkService } from '@core/services/bookmark/bookmark.service';
import { MonumentService } from '@core/services/monument/monument.service';
import { MarkService } from '@core/services/mark/mark.service';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';

import { BookmarkDto } from '@api/model/bookmark-dto';
import { PaginationFacade } from '@shared/facades/pagination.facade';

export type TabType = 'all' | 'monuments' | 'marks';

export interface BookmarkItem {
  bookmarkId: number;
  id: number;
  type: 'monument' | 'mark';
  title: string;
  subtitle?: string;
  occurrenceCount?: number;
  coverId?: number;
  city?: string;
}

@Injectable({ providedIn: 'root' })
export class BookmarksFacade {

  activeTab: TabType = 'all';

  monuments: BookmarkItem[] = [];
  marks: BookmarkItem[] = [];
  filteredItems: BookmarkItem[] = [];

  constructor(
    private bookmarkService: BookmarkService,
    private monumentService: MonumentService,
    private markService: MarkService,
    private markOccurrenceService: MarkOccurrenceService,
    public pagination: PaginationFacade<BookmarkItem>,
  ) {}

  loadBookmarks(): void {
    this.bookmarkService.getUserBookmarks().subscribe(bookmarks => {
      if (!bookmarks.length) {
        this.reset();
        return;
      }
      this.loadBookmarkDetails(bookmarks);
    });
  }

  private loadBookmarkDetails(bookmarks: BookmarkDto[]): void {
    const requests = bookmarks.map(b => {
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
      }

      return this.markService.getMark(b.targetId!).pipe(
        map(mark => ({
          bookmarkId: b.id!,
          id: mark.id!,
          type: 'mark' as const,
          title: '',
          coverId: mark.coverId
        }))
      );
    });

    forkJoin(requests).subscribe(items => {
      const markItems = items.filter(i => i.type === 'mark');

      if (!markItems.length) {
        this.monuments = items.filter(i => i.type === 'monument');
        this.marks = [];
        this.updateFilteredItems();
        return;
      }

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
    });
  }

  changeTab(tab: TabType): void {
    this.activeTab = tab;
    this.updateFilteredItems();
  }

  private updateFilteredItems(): void {
    switch (this.activeTab) {
      case 'monuments':
        this.filteredItems = this.monuments;
        break;
      case 'marks':
        this.filteredItems = this.marks;
        break;
      default:
        this.filteredItems = [...this.monuments, ...this.marks];
    }

    this.pagination.init(this.filteredItems, this.pagination.itemsPerPage, 1);
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

  private reset(): void {
    this.monuments = [];
    this.marks = [];
    this.filteredItems = [];
    this.pagination.init([], this.pagination.itemsPerPage, 1);
  }
  viewDetails(item: BookmarkItem): void {
    const route = item.type === 'monument' ? 'monuments' : 'marks';
    window.location.href = `${environment.baseUrl}/${route}/${item.id}`;
  }

}
