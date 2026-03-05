import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { MarkOccurrenceService } from '@core/services/mark-occurrence/mark-occurrence.service';
import { BookmarkDto } from '@api/model/bookmark-dto';
import { ImageUtils, ImageVariant } from '@shared/utils/image.utils';
import { BookmarkFacade } from '@shared/facades/bookmark.facade';
import {MonumentListDto} from '@api/model/monument-list-dto';

type SearchItem = MonumentListDto;

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './search-results.html'
})
export class SearchResultsComponent {
  @Input() items: SearchItem[] = [];
  @Input() type: 'monuments' | 'marks' = 'monuments';
  @Input() loading = false;
  occurrenceCount: Record<string | number, number> = {};

  constructor(
    private router: Router,
    private markOccurrenceService: MarkOccurrenceService,
    public bookmarkFacade: BookmarkFacade
  ) {}

  ngOnChanges(): void {
    if (!this.items.length) return;

    this.bookmarkFacade.loadForList(BookmarkDto.TypeEnum.Monument);
    this.loadOccurrenceCounts();
  }

  private loadOccurrenceCounts(): void {
    this.items.forEach(item => {
      const id = (item as MonumentListDto).id;
      if (id !== undefined) {
        this.markOccurrenceService.countByMonumentId(id).subscribe(
          count => this.occurrenceCount[id] = count
        );
      }
    });
  }

  toggleBookmark(event: Event, item: SearchItem): void {
    event.preventDefault();
    event.stopPropagation();

    if (!item.id) return;

    this.bookmarkFacade.toggleForItem(BookmarkDto.TypeEnum.Monument, item.id);
  }

  isBookmarked(item: SearchItem): boolean {
    return item.id !== undefined && this.bookmarkFacade.isItemBookmarked(item.id);
  }

  getItemCover(item: SearchItem): string {
    return ImageUtils.getImageUrl(item.coverId, 'assets/placeholder.png', ImageVariant.PREVIEW);
  }

  getItemName(item: SearchItem): string {
    return (item as MonumentListDto).name ?? '';
  }

  getItemSubtitle(item: SearchItem): string {
    const parish = (item as MonumentListDto).parish?.name;
    return parish ? `${parish}, Portugal` : '';
  }

  onItemClick(item: SearchItem): void {
    this.router.navigate(['/monuments', item.id]);
  }
}
