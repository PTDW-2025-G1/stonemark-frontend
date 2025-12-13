import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MonumentResponseDto } from '@api/model/monument-response-dto';
import { MarkDto } from '@api/model/mark-dto';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';
import { BookmarkService } from '@core/services/bookmark/bookmark.service';
import { AuthService } from '@core/services/auth/auth.service';
import { BookmarkDto } from '@api/model/bookmark-dto';
import { finalize } from 'rxjs/operators';
import { environment } from '@env/environment';
import {imageUrl} from '@core/config/image.config';

type SearchItem = MonumentResponseDto | MarkDto;

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.html'
})
export class SearchResultsComponent {
  @Input() items: SearchItem[] = [];
  @Input() type: 'monuments' | 'marks' = 'monuments';
  occurrenceCount: Record<string | number, number> = {};
  bookmarkedItems = new Set<number>();
  bookmarkIds = new Map<number, number>();

  constructor(
    private router: Router,
    private markOccurrenceService: MarkOccurrenceService,
    private bookmarkService: BookmarkService,
    private authService: AuthService
  ) {}

  ngOnChanges(): void {
    if (this.items.length) {
      if (this.isLoggedIn()) {
        this.loadBookmarks();
      }
      this.loadOccurrenceCounts();
    }
  }

  private isLoggedIn(): boolean {
    return this.authService.getAccessToken() !== null;
  }

  private loadBookmarks(): void {
    this.bookmarkService.getUserBookmarks().subscribe(bookmarks => {
      this.bookmarkedItems.clear();
      this.bookmarkIds.clear();

      const targetType = this.type === 'monuments'
        ? BookmarkDto.TypeEnum.Monument
        : BookmarkDto.TypeEnum.Mark;

      bookmarks
        .filter(b => b.type === targetType)
        .forEach(b => {
          if (b.targetId != null) {
            this.bookmarkedItems.add(b.targetId);
            if (b.id != null) {
              this.bookmarkIds.set(b.targetId, b.id);
            }
          }
        });
    });
  }

  private loadOccurrenceCounts(): void {
    if (this.type === 'marks') {
      this.items.forEach(item => {
        if (this.isMark(item)) {
          this.markOccurrenceService.countByMarkId(item.id!).subscribe(
            count => this.occurrenceCount[item.id!] = count
          );
        }
      });
    } else {
      this.items.forEach(item => {
        if (this.isMonument(item)) {
          this.markOccurrenceService.countByMonumentId(item.id!).subscribe(
            count => this.occurrenceCount[item.id!] = count
          );
        }
      });
    }
  }

  isMonument(item: SearchItem): item is MonumentResponseDto {
    return 'name' in item;
  }

  isMark(item: SearchItem): item is MarkDto {
    return 'title' in item;
  }

  toggleBookmark(event: Event, item: SearchItem): void {
    event.stopPropagation();

    if (!this.isLoggedIn()) {
      window.location.href = `${environment.authUrl}/login`;
      return;
    }

    const itemId = item.id;
    if (!itemId) return;

    if (this.isBookmarked(item)) {
      const bookmarkId = this.bookmarkIds.get(itemId);
      if (bookmarkId) {
        this.bookmarkService.deleteBookmark(bookmarkId)
          .pipe(finalize(() => {}))
          .subscribe({
            next: () => {
              this.bookmarkedItems.delete(itemId);
              this.bookmarkIds.delete(itemId);
            },
            error: (error) => console.error('Error removing bookmark:', error)
          });
      }
    } else {
      const type = this.type === 'monuments'
        ? BookmarkDto.TypeEnum.Monument
        : BookmarkDto.TypeEnum.Mark;

      this.bookmarkService.createBookmark(type, itemId)
        .pipe(finalize(() => {}))
        .subscribe({
          next: (bookmark) => {
            this.bookmarkedItems.add(itemId);
            if (bookmark.id) {
              this.bookmarkIds.set(itemId, bookmark.id);
            }
          },
          error: (error) => console.error('Error creating bookmark:', error)
        });
    }
  }

  isBookmarked(item: SearchItem): boolean {
    return item.id !== undefined && this.bookmarkedItems.has(item.id);
  }

  getItemCover(item: SearchItem): string {
    return this.isMark(item)
      ? (item.cover?.storagePath ? imageUrl + item.cover.storagePath : "assets/images/placeholder.png")
      : "https://celina-tours.com/blog/wp-content/uploads/2025/02/BLOG-4-180.jpg";
  }

  getItemName(item: SearchItem): string {
    return this.isMonument(item) ? item.name ?? '' : item.title ?? '';
  }

  getItemSubtitle(item: SearchItem): string {
    if (this.isMonument(item)) {
      return item.city ? `${item.city}, Portugal` : 'Portugal';
    }
    const id = this.isMark(item) ? item.id : undefined;
    const count = id !== undefined ? this.occurrenceCount[id] ?? 0 : 0;
    return `Portugal · ${count} occurrence${count === 1 ? '' : 's'}`;
  }

  onItemClick(item: SearchItem): void {
    const route = this.type === 'monuments' ? '/monuments' : '/marks';
    this.router.navigate([route, item.id]);
  }
}
