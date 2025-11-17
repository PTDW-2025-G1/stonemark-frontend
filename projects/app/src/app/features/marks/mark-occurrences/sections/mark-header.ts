import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mark-occurrences-header',
  template: `
    <div class="mb-8">
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        <!-- Mark Preview -->
        <div class="w-full lg:w-48 lg:flex-shrink-0">
          <div class="w-full h-64 sm:h-72 lg:h-48 rounded-2xl overflow-hidden border-2 border-border shadow-lg">
            <img
              [src]="mark?.cover"
              [alt]="mark?.title"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Mark Info -->
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-3">
            <span class="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold flex items-center gap-2 border border-primary/20">
              <i class="bi bi-collection-fill"></i>
              {{ occurrencesCount }} Occurrences Found
            </span>
          </div>

          <h1 class="text-3xl sm:text-4xl font-serif font-bold text-text mb-3">
            {{ mark?.title }}
          </h1>

          <p class="text-text-muted mb-4 leading-relaxed">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MarkHeaderComponent {
  @Input() mark: any;
  @Input() occurrencesCount = 0;
  @Input() description = 'This mark has been documented at multiple locations across different monuments in Portugal. Each occurrence provides valuable insight into the work patterns and geographic reach of medieval craftsmen.';
}
