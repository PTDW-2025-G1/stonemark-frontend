import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaginationComponent } from '@shared/ui/pagination/pagination';

@Component({
  selector: 'app-search-pagination',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './search-pagination.html'
})
export class SearchPaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
