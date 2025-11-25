import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityCardComponent } from '@shared/ui/entity-card/entity-card';
import {MonumentResponseDto} from '@api/model/monument-response-dto';


@Component({
  selector: 'app-popular-section',
  standalone: true,
  imports: [CommonModule, EntityCardComponent],
  template: `
    <section class="py-12 sm:py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10 sm:mb-12 lg:mb-16">
          <p class="text-xs sm:text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">Monuments</p>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-text">Most Popular</h2>
        </div>

        <div class="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          @for (monument of monuments; track monument.id) {
            <app-entity-card
              [cover]="'https://celina-tours.com/blog/wp-content/uploads/2025/02/BLOG-4-180.jpg'"
              [title]="monument.name || 'Unknown Monument'"
              [subtitle]="monument.city || 'Portugal'"
              [id]="monument.id || 0"
              [type]="'monuments'"
            />
          }
        </div>
      </div>
    </section>
  `
})
export class PopularSectionComponent {
  @Input() monuments: MonumentResponseDto[] = [];
}
