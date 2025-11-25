import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BookmarkItem {
  id: string | number;
  type: 'monument' | 'mark';
  title: string;
  location?: string;
  image?: string;
}

@Component({
  selector: 'app-bookmarks-grid-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      @for (item of items; track item.id) {
        <article class="group bg-gradient-to-br from-surface-alt to-surface rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 relative" (click)="viewDetails.emit(item)">

          <!-- Bookmark Button -->
          <button
            (click)="remove.emit({ id: item.id, type: item.type })"
            class="absolute top-3 right-3 z-10 w-10 h-10 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-error hover:scale-110 transition-all duration-300 shadow-lg group/btn">
            <i class="bi bi-bookmark-fill text-primary group-hover/btn:text-white transition-colors"></i>
          </button>

          <!-- Type Badge -->
          <div class="absolute top-3 left-3 z-10 px-3 py-1 bg-surface/90 backdrop-blur-sm rounded-full text-xs font-medium border border-border">
            <i [class]="item.type === 'monument' ? 'bi bi-building' : 'bi bi-grid-3x3'" class="mr-1"></i>
            {{ item.type === 'monument' ? 'Monument' : 'Mark' }}
          </div>

          <!-- Image -->
          <div class="relative aspect-[4/3] overflow-hidden">
            <img
              [src]="item.image || 'https://celina-tours.com/blog/wp-content/uploads/2025/02/BLOG-4-180.jpg'"
              [alt]="item.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <!-- Content -->
          <div class="p-5">
            <h3 class="text-lg font-serif font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
              {{ item.title }}
            </h3>
            <p class="text-sm text-text-muted mb-4 flex items-center gap-1.5">
              <i class="bi bi-geo-alt-fill text-primary text-xs"></i>
              {{ item.location }}
            </p>

            <button
              (click)="viewDetails.emit(item)"
              class="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-2">
              See Details
              <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </article>
      }
    </div>
  `
})
export class GridSectionComponent {
  @Input() items: BookmarkItem[] = [];
  @Output() remove = new EventEmitter<{ id: string | number, type: 'monument' | 'mark' }>();
  @Output() viewDetails = new EventEmitter<BookmarkItem>();
}
