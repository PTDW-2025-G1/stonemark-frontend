import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {Mark} from '@core/models/mark.model';
import {MonumentResponseDto} from '@api/model/monument-response-dto';

type SearchItem = MonumentResponseDto | Mark;

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.html'
})
export class SearchResultsComponent {
  @Input() $items!: Observable<SearchItem[]>;
  @Input() type: 'monuments' | 'marks' = 'monuments';

  constructor(private router: Router) {}

  isMonument(item: SearchItem): item is MonumentResponseDto {
    return 'name' in item;
  }

  isMark(item: SearchItem): item is Mark {
    return 'title' in item;
  }


  getItemCover(item: SearchItem): string {
    return this.isMark(item)
      ? (item.cover ?? "https://celina-tours.com/blog/wp-content/uploads/2025/02/BLOG-4-180.jpg")
      : "https://celina-tours.com/blog/wp-content/uploads/2025/02/BLOG-4-180.jpg";
  }

  getItemName(item: SearchItem): string {
    return this.isMonument(item) ? item.name ?? '' : item.title ?? '';
  }

  getItemLocation(item: SearchItem): string {
    return this.isMonument(item) ? (item.city ?? 'Portugal') : 'Portugal';
  }

  onItemClick(item: SearchItem): void {
    const route = this.type === 'monuments' ? '/monuments' : '/marks';
    this.router.navigate([route, item.id]);
  }
}
