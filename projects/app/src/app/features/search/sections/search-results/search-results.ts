import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MonumentResponseDto} from '@api/model/monument-response-dto';
import {MarkDto} from '@api/model/mark-dto';
import {MarkOccurrenceService} from '@core/services/mark/mark-occurrence.service';

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

  constructor(private router: Router, private markOccurrenceService: MarkOccurrenceService) {}

  ngOnChanges(): void {
    if (this.type === 'marks' && this.items.length) {
      this.items.forEach(mark => {
        if (this.isMark(mark) && mark.id !== undefined) {
          this.markOccurrenceService.countByMarkId(mark.id).subscribe(count => {
            this.occurrenceCount[mark.id!] = count;
          });
        }
      });
    }
    if (this.type === 'monuments' && this.items.length) {
      this.items.forEach(monument => {
        if (this.isMonument(monument) && monument.id !== undefined) {
          this.markOccurrenceService.countByMonumentId(monument.id).subscribe(count => {
            this.occurrenceCount[monument.id!] = count;
          });
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
    // To:do implement bookmark logic
  }

  isBookmarked(item: SearchItem): boolean {
    // To:do implement bookmark logic
    return false;
  }


  getItemCover(item: SearchItem): string {
    return this.isMark(item)
      ? "https://upload.wikimedia.org/wikipedia/commons/4/4d/Igreja_de_Nossa_Senhora_da_Concei%C3%A7%C3%A3o_%28Ermida%29_sigla_0456_1.JPG"
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
