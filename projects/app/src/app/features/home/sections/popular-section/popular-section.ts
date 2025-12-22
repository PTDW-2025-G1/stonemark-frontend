import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityCardComponent } from '@shared/ui/entity-card/entity-card';
import {MonumentResponseDto} from '@api/model/monument-response-dto';
import {ImageUtils} from '@shared/utils/image.utils';
import {HomeHeaderComponent} from '@shared/ui/home-header/home-header';


@Component({
  selector: 'app-popular-section',
  standalone: true,
  imports: [CommonModule, EntityCardComponent, HomeHeaderComponent],
  template: `
    <section class="py-12 sm:py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <app-home-header
          [badge]="'Featured'"
          [title]="'Most Popular Monuments'"
          [subtitle]="'Discover the most visited and appreciated monuments by our community'"
        />

        <div class="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          @for (monument of monuments; track monument.id) {
            <app-entity-card
              [cover]="getImageUrl(monument)"
              [title]="monument.name || 'Unknown Monument'"
              [subtitle]="monument.city + ', Portugal'"
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

  getImageUrl(monument: MonumentResponseDto): string {
    return ImageUtils.getImageUrl(monument.coverId, 'assets/images/placeholder.png');
  }
}
