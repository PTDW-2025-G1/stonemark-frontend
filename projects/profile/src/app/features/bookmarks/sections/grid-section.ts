import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUtils, ImageVariant } from '@shared/utils/image.utils';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MONUMENTS_ICON, MARKS_ICON } from '@core/constants/content-icons';
import { environment } from '@env/environment';

interface BookmarkItem {
  bookmarkId: number;
  id: number;
  type: 'monument' | 'mark';
  title: string;
  subtitle?: string;
  location?: string;
  city?: string;
  coverId?: number;
}

@Component({
  selector: 'app-bookmarks-grid-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

      <!-- Skeleton -->
      @if (loading) {
        @for (skeleton of [1,2,3,4,5,6]; track skeleton) {
          <div
            class="relative bg-white rounded-2xl overflow-hidden shadow-md
                   border border-border min-h-[360px]"
          >

            <!-- Skeleton bookmark -->
            <div class="absolute top-3 right-3 z-10">
              <div class="w-10 h-10 rounded-full bg-surface-muted animate-pulse"></div>
            </div>

            <!-- Skeleton badge -->
            <div class="absolute top-3 left-3 z-10">
              <div class="w-24 h-6 rounded-full bg-surface-muted animate-pulse"></div>
            </div>

            <!-- Skeleton image -->
            <div class="relative aspect-[4/3] bg-surface-alt animate-pulse min-h-[200px]">
              <div class="absolute inset-0 bg-gradient-to-br from-surface-muted/40 to-surface-alt"></div>
            </div>

            <!-- Skeleton content -->
            <div class="p-5 space-y-3">
              <div class="space-y-2">
                <div class="h-5 w-4/5 bg-surface-alt rounded animate-pulse"></div>
                <div class="h-5 w-3/5 bg-surface-alt rounded animate-pulse"></div>
              </div>
              <div class="h-4 w-1/2 bg-surface-alt rounded animate-pulse"></div>
            </div>

          </div>
        }
      }

      <!-- Results -->
      @if (!loading) {
        @for (item of items; track item.id) {

          <a
            [href]="getItemUrl(item)"
            class="group relative bg-white rounded-2xl overflow-hidden shadow-md
                   hover:shadow-2xl border border-border hover:border-primary/30
                   transition-all duration-300 hover:-translate-y-1 block
                   min-h-[360px]"
          >

            <!-- Bookmark Button -->
            <button
              (click)="remove.emit({ bookmarkId: item.bookmarkId, type: item.type });
                       $event.stopPropagation(); $event.preventDefault()"
              class="absolute top-3 right-3 z-10 w-10 h-10 bg-surface/90 backdrop-blur-sm
                     rounded-full flex items-center justify-center hover:bg-error
                     hover:scale-110 transition-all duration-300 shadow-lg group/btn">
              <i class="bi bi-bookmark-check-fill text-primary group-hover/btn:text-white transition-colors"></i>
            </button>

            <!-- Type Badge -->
            <div
              class="absolute top-3 left-3 z-10 px-3 py-1 bg-surface/90 backdrop-blur-sm
                     rounded-full text-xs font-medium border border-border flex items-center
                     pointer-events-none">
              <span class="mr-1"
                    [innerHTML]="item.type === 'monument' ? monumentsIcon : marksIcon">
              </span>
              {{ item.type === 'monument' ? 'Monument' : 'Mark' }}
            </div>

            <!-- Image -->
            <div class="relative aspect-[4/3] overflow-hidden min-h-[200px]">
              <img
                [src]="getItemCover(item)"
                [alt]="getItemName(item)"
                class="w-full h-full object-cover
                       group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <!-- Content -->
            <div class="p-5 pointer-events-none">
              <h3
                class="text-lg font-serif font-semibold mb-1
                       group-hover:text-primary transition-colors line-clamp-2">
                {{ getItemName(item) }}
              </h3>

              <p class="text-sm text-text-muted flex items-center gap-1.5">
                <i class="bi bi-geo-alt-fill text-primary text-xs"></i>
                {{ getItemSubtitle(item) }}
              </p>
            </div>

          </a>
        }
      }

    </div>
  `
})
export class GridSectionComponent {

  @Input() items: BookmarkItem[] = [];
  @Input() loading = false;

  @Output() viewDetails = new EventEmitter<BookmarkItem>();
  @Output() remove = new EventEmitter<{ bookmarkId: number, type: 'monument' | 'mark' }>();

  monumentsIcon: SafeHtml;
  marksIcon: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    this.monumentsIcon = this.sanitizer.bypassSecurityTrustHtml(MONUMENTS_ICON);
    this.marksIcon = this.sanitizer.bypassSecurityTrustHtml(MARKS_ICON);
  }

  getItemUrl(item: BookmarkItem): string {
    const base = environment.baseUrl;
    const typePath = item.type === 'monument' ? 'monuments' : 'marks';
    return `${base}/${typePath}/${item.id}`;
  }

  getItemCover(item: BookmarkItem): string {
    return ImageUtils.getImageUrl(
      item.coverId,
      'assets/placeholder.png',
      ImageVariant.PREVIEW
    );
  }

  getItemName(item: BookmarkItem): string {
    return item.title ?? '';
  }

  getItemSubtitle(item: BookmarkItem): string {
    if (item.type === 'monument') {
      return item.city ? `${item.city}, Portugal` : 'Portugal';
    }
    return item.subtitle ?? 'Portugal';
  }
}
