import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {Mark} from '@core/models/mark.model';
import {MonumentResponseDto} from '@api/model/monument-response-dto';
import {MarkDto} from '@api/model/mark-dto';

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

  constructor(private router: Router) {}

  isMonument(item: SearchItem): item is MonumentResponseDto {
    return 'name' in item;
  }

  isMark(item: SearchItem): item is Mark {
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

  getItemLocation(item: SearchItem): string {
    if (this.isMonument(item)) {
      return item.city ? `${item.city}, Portugal` : 'Portugal';
    }

    return this.isMark(item) && item.monument?.name
      ? item.monument.name
      : 'Portugal';
  }


  onItemClick(item: SearchItem): void {
    const route = this.type === 'monuments' ? '/monuments' : '/marks';
    this.router.navigate([route, item.id]);
  }
}
