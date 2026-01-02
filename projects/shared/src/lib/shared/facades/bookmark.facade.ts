import { Injectable } from '@angular/core';
import { BookmarkService } from '@core/services/bookmark/bookmark.service';
import { AuthService } from '@core/services/auth/auth.service';
import { BookmarkDto } from '@api/model/bookmark-dto';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class BookmarkFacade {

  isBookmarked = false;
  count = 0;
  private bookmarkId?: number;

  private bookmarkedItems = new Set<number>();
  private bookmarkIds = new Map<number, number>();

  constructor(
    private bookmarkService: BookmarkService,
    private authService: AuthService
  ) {}

  init(targetType: BookmarkDto.TypeEnum, targetId: number): void {
    if (!this.isLoggedIn()) return;

    this.bookmarkService.isBookmarked(targetType, targetId).subscribe(isBookmarked => {
      this.isBookmarked = isBookmarked;
    });

    this.bookmarkService.getUserBookmarks().subscribe(bookmarks => {
      const filtered = bookmarks.filter(b => b.type === targetType && b.targetId === targetId);

      this.count = filtered.length;
      this.bookmarkId = filtered[0]?.id;
    });
  }

  toggle(targetType: BookmarkDto.TypeEnum, targetId: number): void {
    if (!this.ensureAuth()) return;

    if (this.isBookmarked && this.bookmarkId) {
      this.bookmarkService.deleteBookmark(this.bookmarkId).subscribe(() => {
        this.isBookmarked = false;
        this.count = Math.max(0, this.count - 1);
        this.bookmarkId = undefined;
      });
    } else {
      this.bookmarkService.createBookmark(targetType, targetId).subscribe(bookmark => {
        this.isBookmarked = true;
        this.count += 1;
        this.bookmarkId = bookmark.id;
      });
    }
  }

  loadForList(targetType: BookmarkDto.TypeEnum): void {
    if (!this.isLoggedIn()) return;

    this.bookmarkService.getUserBookmarks().subscribe(bookmarks => {
      this.bookmarkedItems.clear();
      this.bookmarkIds.clear();

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

  toggleForItem(targetType: BookmarkDto.TypeEnum, targetId: number): void {
    if (!this.ensureAuth()) return;

    if (this.bookmarkedItems.has(targetId)) {
      const bookmarkId = this.bookmarkIds.get(targetId);
      if (!bookmarkId) return;

      this.bookmarkService.deleteBookmark(bookmarkId).subscribe(() => {
        this.bookmarkedItems.delete(targetId);
        this.bookmarkIds.delete(targetId);
      });
    } else {
      this.bookmarkService.createBookmark(targetType, targetId).subscribe(bookmark => {
        this.bookmarkedItems.add(targetId);
        if (bookmark.id != null) {
          this.bookmarkIds.set(targetId, bookmark.id);
        }
      });
    }
  }

  isItemBookmarked(targetId: number): boolean {
    return this.bookmarkedItems.has(targetId);
  }

  private isLoggedIn(): boolean {
    return this.authService.getAccessToken() !== null;
  }

  private ensureAuth(): boolean {
    if (!this.isLoggedIn()) {
      window.location.href = `${environment.authUrl}/login`;
      return false;
    }
    return true;
  }
}
