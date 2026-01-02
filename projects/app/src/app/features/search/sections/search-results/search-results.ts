import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { MonumentResponseDto } from '@api/model/monument-response-dto';
import { MarkDto } from '@api/model/mark-dto';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';
import { BookmarkDto } from '@api/model/bookmark-dto';
import { ImageUtils } from '@shared/utils/image.utils';
import { BookmarkFacade } from '@shared/facades/bookmark.facade';

type SearchItem = MonumentResponseDto | MarkDto;

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './search-results.html'
})
export class SearchResultsComponent {
  @Input() items: SearchItem[] = [];
  @Input() type: 'monuments' | 'marks' = 'monuments';
  occurrenceCount: Record<string | number, number> = {};

  constructor(
    private router: Router,
    private markOccurrenceService: MarkOccurrenceService,
    public bookmarkFacade: BookmarkFacade
  ) {}

  ngOnChanges(): void {
    if (!this.items.length) return;

    const targetType =
      this.type === 'monuments'
        ? BookmarkDto.TypeEnum.Monument
        : BookmarkDto.TypeEnum.Mark;

    this.bookmarkFacade.loadForList(targetType);
    this.loadOccurrenceCounts();
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
    event.preventDefault();
    event.stopPropagation();

    if (!item.id) return;

    const targetType =
      this.type === 'monuments'
        ? BookmarkDto.TypeEnum.Monument
        : BookmarkDto.TypeEnum.Mark;

    this.bookmarkFacade.toggleForItem(targetType, item.id);
  }

  isBookmarked(item: SearchItem): boolean {
    return item.id !== undefined && this.bookmarkFacade.isItemBookmarked(item.id);
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
