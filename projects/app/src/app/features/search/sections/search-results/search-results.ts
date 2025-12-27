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
import { ImageUtils } from '@shared/utils/image.utils';

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
        const id = (item as MarkDto).id;
        if (id !== undefined) {
          this.markOccurrenceService.countByMarkId(id).subscribe(
            count => this.occurrenceCount[id] = count
          );
        }
      });
    } else {
      this.items.forEach(item => {
        const id = (item as MonumentResponseDto).id;
        if (id !== undefined) {
          this.markOccurrenceService.countByMonumentId(id).subscribe(
            count => this.occurrenceCount[id] = count
          );
        }
      });
    }
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
            error: (error) => console.error('Erro ao remover bookmark:', error)
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
          error: (error) => console.error('Erro ao criar bookmark:', error)
        });
    }
  }

  isBookmarked(item: SearchItem): boolean {
    return item.id !== undefined && this.bookmarkedItems.has(item.id);
  }

  getItemCover(item: SearchItem): string {
    return ImageUtils.getImageUrl(item.coverId, 'assets/placeholder.png');
  }

  getItemName(item: SearchItem): string {
    return this.type === 'monuments'
      ? (item as MonumentResponseDto).name ?? ''
      : '';
  }

  getItemSubtitle(item: SearchItem): string {
    if (this.type === 'monuments') {
      const monument = item as MonumentResponseDto;
      return monument.city ? `${monument.city}, Portugal` : 'Portugal';
    }
    const id = item.id;
    const count = id !== undefined ? this.occurrenceCount[id] ?? 0 : 0;
    return `Portugal · ${count} occurrence${count === 1 ? '' : 's'}`;
  }

  onItemClick(item: SearchItem): void {
    const route = this.type === 'monuments' ? '/monuments' : '/marks';
    this.router.navigate([route, item.id]);
  }
}
