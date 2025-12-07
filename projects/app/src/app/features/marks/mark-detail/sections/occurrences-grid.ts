import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MarkOccurrenceDto} from '@api/model/mark-occurrence-dto';

@Component({
  selector: 'app-mark-detail-occurrences-grid',
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      @for (occurrence of occurrences; track occurrence.id) {
        <div
          class="group bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
          (click)="viewOccurrence.emit(occurrence.id)">

          <!-- Imagem -->
          <div class="relative h-48 overflow-hidden bg-surface-muted">
            <img
              [src]="'https://photos1.blogger.com/blogger/6821/1071/1600/marca_alco6.jpg'"
              [alt]="'Mark Occurrence of: ' + occurrence.mark?.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            <!-- Monumento -->
            <div class="absolute top-3 left-3">
              <button
                (click)="viewMonument.emit(occurrence.monument?.id); $event.stopPropagation()"
                class="px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20 hover:bg-primary transition-colors flex items-center gap-1">
                <i class="bi bi-building"></i>
                {{ occurrence.monument?.name }}
              </button>
            </div>

            <!-- Quick View -->
            <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="w-9 h-9 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                <i class="bi bi-eye text-primary text-sm"></i>
              </div>
            </div>
          </div>

          <!-- Conteúdo -->
          <div class="p-5">
            <h3 class="text-lg font-bold text-text mb-2 line-clamp-1 group-hover:text-primary transition-colors">
              {{ 'Mark Occurrence of ' + occurrence.mark?.title }}
            </h3>

            <div class="flex items-center gap-2 text-text-muted text-sm mb-3">
              <i class="bi bi-geo-alt-fill text-primary"></i>
              <span class="line-clamp-1">{{ occurrence.monument?.name }}</span>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between pt-4 border-t border-border">
              <div class="flex items-center gap-2">
                <i class="bi bi-person-circle text-primary"></i>
                <span
                  class="text-xs text-text-muted">{{ occurrence.user?.firstName }} {{ occurrence.user?.lastName }}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="bi bi-calendar-event text-primary"></i>
                <span class="text-xs text-text-muted">{{ occurrence.createdAt }}</span>
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
  @Input() occurrences: MarkOccurrenceDto[] = [];
  @Output() viewOccurrence = new EventEmitter<number>();
  @Output() viewMonument = new EventEmitter<number>();
}
