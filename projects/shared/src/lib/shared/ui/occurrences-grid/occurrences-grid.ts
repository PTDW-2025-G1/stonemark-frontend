import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DateUtils } from '@shared/utils/date.utils';
import {ImageUtils} from '@shared/utils/image.utils';
import {MarkOccurrenceListDto} from '@api/model/mark-occurrence-list-dto';

@Component({
  selector: 'app-occurrences-grid',
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      @for (occurrence of occurrences; track occurrence.id) {
        <div
          class="group relative rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer aspect-square"
          (click)="viewOccurrence.emit(occurrence.id)">

          <!-- Image -->
          <div class="relative w-full h-full overflow-hidden bg-surface-muted">
            <img
              [src]="getImageUrl(occurrence)"
              [alt]="'Mark Occurrence'"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>

            <!-- Quick View Icon -->
            <div class="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="w-9 h-9 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                <i class="bi bi-eye text-primary text-sm"></i>
              </div>
            </div>

            <!-- Info on hover - Bottom -->
            <div class="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
              <div class="flex items-center justify-between text-white">
                <div class="flex items-center gap-2">
                  <i class="bi bi-calendar-event"></i>
                  <span class="text-sm">{{ formatDate(occurrence.publishedAt) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class OccurrencesGridComponent {
  @Input() occurrences: MarkOccurrenceListDto[] = [];
  @Input() showMarkBadge = false;
  @Output() viewOccurrence = new EventEmitter<number>();
  @Output() viewMonument = new EventEmitter<number>();
  @Output() viewMark = new EventEmitter<number>();

  formatDate(date: string | undefined): string {
    return DateUtils.formatShortDate(date);
  }

  getImageUrl(occurrence: MarkOccurrenceListDto): string {
    return ImageUtils.getImageUrl(occurrence.coverId, 'assets/placeholder.png');
  }
}
