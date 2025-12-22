import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityCardComponent } from '@shared/ui/entity-card/entity-card';
import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { ImageUtils } from '@shared/utils/image.utils';
import {HomeHeaderComponent} from '@shared/ui/home-header/home-header';

@Component({
  selector: 'app-last-marks-section',
  standalone: true,
  imports: [CommonModule, EntityCardComponent, HomeHeaderComponent],
  template: `
    <section class="py-12 sm:py-16 lg:py-24 bg-surface">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <app-home-header
          [badge]="'Recently Discovered'"
          [title]="'Latest Stone Marks'"
          [subtitle]="'Explore the most recent mason marks documented by our community'"
        />

        <!-- Grid -->
        <div class="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          @for (occurrence of lastOccurrences; track occurrence.id) {
            <app-entity-card
              [cover]="getImageUrl(occurrence)"
              [subtitle]="occurrence.monument?.name || 'Unknown Monument'"
              [id]="occurrence.id ?? 0"
              [type]="'marks/occurrence'"
            />
          }
        </div>
      </div>
    </section>
  `
})
export class LastMarkSectionComponent {
  @Input() lastOccurrences: MarkOccurrenceDto[] = [];

  getImageUrl(occurrence: MarkOccurrenceDto): string {
    return ImageUtils.getImageUrl(
      occurrence.mark?.coverId,
      'assets/images/placeholder.png'
    );
  }
}
