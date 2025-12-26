import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkDto } from '@api/model/mark-dto';
import { ImageUtils } from '@shared/utils/image.utils';
import { MONUMENTS_ICON } from '@core/constants/content-icons';
import { SafeHtmlPipe } from '@shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-mark-detail-header',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  template: `
    <div class="mb-8">
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        <!-- Mark Preview -->
        <div class="w-full lg:w-48 lg:flex-shrink-0">
          <div class="w-full h-64 sm:h-72 lg:h-48 rounded-2xl overflow-hidden border-2 border-border shadow-lg">
            <img
              [src]="getImageUrl()"
              [alt]="mark?.title"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Mark Info -->
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-3 mb-3">
            <span
              class="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold flex items-center gap-2 border border-primary/20">
              <i class="bi bi-collection-fill"></i>
              {{ occurrencesCount }} Occurrences
            </span>

            <span
              class="px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-bold flex items-center gap-2 border border-accent/20">
              <span class="flex items-center" [innerHTML]="monumentsIcon | safeHtml"></span>
              {{ monumentsCount }} Monuments
            </span>

            <button
              (click)="toggleBookmark()"
              class="px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 border transition-colors cursor-pointer"
              [class]="isBookmarked
              ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20'
              : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'">
              <i [class]="isBookmarked ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'"></i>
              {{ isBookmarked ? 'Bookmarked' : 'Add Bookmark' }}
              @if (bookmarksCount > 0) {
                <span class="ml-1">({{ bookmarksCount }})</span>
              }
            </button>
          </div>

          <h1 class="text-3xl sm:text-4xl font-serif font-bold text-text mb-3">
            {{ mark?.title }}
          </h1>

          <p class="text-text-muted mb-4 leading-relaxed">
            {{ mark?.description }}
          </p>

          <div class="flex flex-wrap gap-3 mt-4">
            <button
              (click)="openReport()"
              class="px-5 py-2.5 text-sm font-semibold text-text-muted border border-border rounded-lg hover:border-red-500 hover:text-red-500 transition-colors flex items-center gap-2 group cursor-pointer">
              <i class="bi bi-flag group-hover:text-red-500"></i>
              Report Issue
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MarkHeaderComponent {
  @Input() mark?: MarkDto;
  @Input() occurrencesCount = 0;
  @Input() monumentsCount = 0;
  @Input() bookmarksCount = 0;
  @Input() isBookmarked = false;

  @Output() bookmarkToggled = new EventEmitter<void>();
  @Output() reportClicked = new EventEmitter<void>();

  monumentsIcon = MONUMENTS_ICON;

  toggleBookmark(): void {
    this.bookmarkToggled.emit();
  }

  openReport(): void {
    this.reportClicked.emit();
  }

  getImageUrl(): string {
    return ImageUtils.getImageUrl(this.mark?.coverId, 'assets/placeholder.png');
  }
}
