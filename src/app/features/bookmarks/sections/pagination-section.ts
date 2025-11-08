import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmarks-pagination-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 mt-12">
      <button
        (click)="previousPage.emit()"
        [disabled]="currentPage === 1"
        class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 border border-border rounded-lg hover:bg-surface-alt transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
        <i class="bi bi-chevron-left"></i>
        Previous
      </button>

      <div class="flex items-center gap-2">
        @for (page of pageNumbers; track page) {
          @if (page === -1) {
            <span class="px-2 text-text-muted text-sm">...</span>
          } @else {
            <button
              (click)="goToPage.emit(page)"
              [class.bg-primary]="currentPage === page"
              [class.text-primary-foreground]="currentPage === page"
              [class.border]="currentPage !== page"
              [class.border-border]="currentPage !== page"
              [class.hover:bg-surface-alt]="currentPage !== page"
              class="w-10 h-10 flex items-center justify-center rounded-lg font-medium text-sm transition-colors">
              {{ page }}
            </button>
          }
        }
      </div>

      <button
        (click)="nextPage.emit()"
        [disabled]="currentPage === totalPages"
        class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 border border-border rounded-lg hover:bg-surface-alt transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
        Next
        <i class="bi bi-chevron-right"></i>
      </button>
    </nav>
  `
})
export class PaginationSectionComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() pageNumbers: number[] = [];
  @Output() goToPage = new EventEmitter<number>();
  @Output() previousPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();
}
