import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, tap, switchMap, map } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';

import { BreadcrumbComponent, BreadcrumbItem } from '@shared/ui/breadcrumb/breadcrumb';
import { LoadingStateComponent } from '@features/marks/mark-detail/sections/loading-state';
import { MarkHeaderComponent } from '@features/marks/mark-detail/sections/mark-header';
import { OccurrencesGridComponent } from '@shared/ui/occurrences-grid/occurrences-grid';
import { EmptyStateComponent } from '@features/marks/mark-detail/sections/empty-state';
import { InfoBoxComponent } from '@features/marks/mark-detail/sections/info-box';
import { MarkDto } from '@api/model/mark-dto';
import { MarkService } from '@core/services/mark/mark.service';
import { BookmarkService } from '@core/services/bookmark/bookmark.service';
import { BookmarkDto } from '@api/model/bookmark-dto';
import { AuthService } from '@core/services/auth/auth.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-mark-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent, LoadingStateComponent, MarkHeaderComponent, OccurrencesGridComponent, EmptyStateComponent, InfoBoxComponent],
  templateUrl: './mark-detail.html'
})
export class MarkDetailComponent implements OnInit {
  mark$!: Observable<MarkDto>;
  occurrences: MarkOccurrenceDto[] = [];
  breadcrumbItems$!: Observable<BreadcrumbItem[]>;
  loading = true;
  occurrencesCount = 0;
  uniqueMonumentsCount = 0;
  bookmarksCount = 0;
  isBookmarked = false;

  private currentMarkId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private markService: MarkService,
    private markOccurrenceService: MarkOccurrenceService,
    private bookmarkService: BookmarkService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.mark$ = this.route.paramMap.pipe(
      switchMap(params => {
        const markId = Number(params.get('id'));
        this.currentMarkId = markId;
        this.loadOccurrences(markId);

        this.markOccurrenceService.countByMarkId(markId).subscribe(count => {
          this.occurrencesCount = count;
        });

        if (this.authService.getAccessToken()) {
          this.loadBookmarkState(markId);
        }

        return this.markService.getMark(markId);
      }),
      tap(mark => {
        if (mark?.title) {
          this.titleService.setTitle(mark.title);
        }
      })
    );

    this.breadcrumbItems$ = this.mark$.pipe(
      map(mark => [
        { label: 'Marks', link: '/search/marks', icon: 'bi bi-grid-3x3-gap' },
        { label: mark?.title ?? 'Mark', link: ['/marks', mark?.id], active: true }
      ])
    );
  }

  private loadBookmarkState(markId: number): void {
    this.bookmarkService.isBookmarked(BookmarkDto.TypeEnum.Mark, markId).subscribe(isBookmarked => {
      this.isBookmarked = isBookmarked;
    });
    this.bookmarkService.getUserBookmarks().subscribe(bookmarks => {
      this.bookmarksCount = bookmarks.filter(b => b.type === BookmarkDto.TypeEnum.Mark && b.targetId === markId).length;
    });
  }

  private loadOccurrences(markId: number): void {
    this.loading = true;

    this.markOccurrenceService.getByMarkId(markId).subscribe({
      next: list => {
        this.occurrences = list ?? [];
        this.uniqueMonumentsCount = new Set(
          list?.map(o => o.monument?.id).filter(Boolean)
        ).size;
        this.loading = false;
      },
      error: err => {
        console.error('Error loading occurrences:', err);
        this.occurrences = [];
        this.loading = false;
      }
    });
  }

  toggleBookmark(): void {
    if (!this.authService.getAccessToken()) {
      window.location.href = `${environment.authUrl}/login`;
      return;
    }

    if (this.currentMarkId == null) return;

    if (this.isBookmarked) {
      this.bookmarkService.getUserBookmarks().subscribe(bookmarks => {
        const bookmark = bookmarks.find(b =>
          b.type === BookmarkDto.TypeEnum.Mark && b.targetId === this.currentMarkId
        );
        if (bookmark?.id != null) {
          this.bookmarkService.deleteBookmark(bookmark.id).subscribe(() => {
            this.isBookmarked = false;
            this.bookmarksCount = Math.max(0, this.bookmarksCount - 1);
          });
        }
      });
    } else {
      this.bookmarkService.createBookmark(BookmarkDto.TypeEnum.Mark, this.currentMarkId).subscribe(() => {
        this.isBookmarked = true;
        this.bookmarksCount += 1;
      });
    }
  }

  viewOccurrence(occurrenceId: number): void {
    this.router.navigate(['marks/occurrence', occurrenceId]);
  }

  viewMonument(monumentId: number): void {
    this.router.navigate(['/monuments', monumentId]);
  }
}
