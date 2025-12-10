import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {Observable, tap} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import { MonumentService } from '@core/services/monument/monument.service';
import {DomSanitizer, SafeResourceUrl, Title} from '@angular/platform-browser';
import { NotificationService } from '@core/services/notification.service';
import {MonumentResponseDto} from '@api/model/monument-response-dto';
import {OccurrencesGridComponent} from '@shared/ui/occurrences-grid/occurrences-grid';
import {MarkOccurrenceDto} from '@api/model/mark-occurrence-dto';
import {MarkOccurrenceService} from '@core/services/mark/mark-occurrence.service';
import {BookmarkService} from '@core/services/bookmark/bookmark.service';
import {BookmarkDto} from '@api/model/bookmark-dto';
import { AuthService } from '@core/services/auth/auth.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-monument-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, OccurrencesGridComponent],
  templateUrl: './monument-detail.html'
})
export class MonumentDetailComponent implements OnInit {
  monument$!: Observable<MonumentResponseDto | undefined>;
  occurrences$!: Observable<MarkOccurrenceDto[]>;
  mapUrl: SafeResourceUrl | null = null;
  isBookmarked = false;
  bookmarksCount = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monumentService: MonumentService,
    private markOccurrenceService: MarkOccurrenceService,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private notificationService: NotificationService,
    private bookmarkService: BookmarkService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const monumentId$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
    );

    this.monument$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.monumentService.getMonumentById(id);
      }),
      tap(monument => {
        if (monument && monument.latitude != null && monument.longitude != null) {
          this.setMapUrl(monument.latitude, monument.longitude);
          this.titleService.setTitle(`${monument.name} - StoneMark`);
        } else {
          this.mapUrl = null;
        }
      })
    );

    this.occurrences$ = monumentId$.pipe(
      switchMap(id => this.markOccurrenceService.getByMonumentId(id)),
      map(result => Array.isArray(result) ? result : result.content ?? []),
    );

    monumentId$.subscribe(id => {
      if (id != null && this.authService.getAccessToken()) {
        this.loadBookmarkState(id);
      }
    });
  }

  private loadBookmarkState(monumentId: number): void {
    this.bookmarkService.isBookmarked(BookmarkDto.TypeEnum.Monument, monumentId).subscribe(isBookmarked => {
      this.isBookmarked = isBookmarked;
    });
    this.bookmarkService.getUserBookmarks().subscribe(bookmarks => {
      this.bookmarksCount = bookmarks.filter(b => b.type === BookmarkDto.TypeEnum.Monument && b.targetId === monumentId).length;
    });
  }

  toggleBookmark(): void {
    if (!this.authService.getAccessToken()) {
      window.location.href = `${environment.authUrl}/login`;
      return;
    }

    const monumentId = Number(this.route.snapshot.paramMap.get('id'));
    if (!monumentId) return;

    if (this.isBookmarked) {
      this.bookmarkService.getUserBookmarks().subscribe(bookmarks => {
        const bookmark = bookmarks.find(b => b.type === BookmarkDto.TypeEnum.Monument && b.targetId === monumentId);
        if (bookmark && bookmark.id != null) {
          this.bookmarkService.deleteBookmark(bookmark.id).subscribe(() => {
            this.isBookmarked = false;
            this.bookmarksCount = Math.max(0, this.bookmarksCount - 1);
          });
        }
      });
    } else {
      this.bookmarkService.createBookmark(BookmarkDto.TypeEnum.Monument, monumentId).subscribe(() => {
        this.isBookmarked = true;
        this.bookmarksCount += 1;
      });
    }
  }

  captureMark(): void {
    this.router.navigate(['/marks/capture']);
  }

  viewMarks(): void {
    console.log('View Marks');
    const monumentId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/search/marks'], { queryParams: { monumentId } });
  }

  suggestCorrection(): void {
    const monumentId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/suggestions/new'], { queryParams: { monumentId } });
  }

  onViewOccurrence(occurrenceId: number): void {
    this.router.navigate(['marks/occurrence', occurrenceId]);
  }

  setMapUrl(latitude: number, longitude: number) {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openDirections(latitude: number, longitude: number) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank');
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.notificationService.showSuccess('Link copied to clipboard!');
    });
  }

  shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }

  shareOnInstagram() {
    window.open('https://www.instagram.com/', '_blank');
  }
}
