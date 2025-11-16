import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {Monument} from '@core/models/monument.model';
import {Mark} from '@core/models/mark.model';

type SearchItem = Monument | Mark;

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.html'
})
export class SearchResultsComponent {
  @Input() items$!: Observable<SearchItem[]>;
  @Input() type: 'monuments' | 'marks' = 'monuments';

  constructor(private router: Router) {}

  isMonument(item: SearchItem): item is Monument {
    return 'name' in item;
  }

  getItemCover(item: SearchItem): string {
    return item.cover ?? '';
  }

  getItemName(item: SearchItem): string {
    return this.isMonument(item) ? item.name : item.title;
  }

  getItemLocation(item: SearchItem): string {
    return item.location ?? '';
  }

  onItemClick(item: SearchItem): void {
    const route = this.type === 'monuments' ? '/monuments' : '/marks';
    this.router.navigate([route, item.id]);
  }
}
