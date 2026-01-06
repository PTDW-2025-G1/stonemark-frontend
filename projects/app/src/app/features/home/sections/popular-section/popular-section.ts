import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityCardComponent } from '@shared/ui/entity-card/entity-card';
import {ImageUtils} from '@shared/utils/image.utils';
import {HomeHeaderComponent} from '@shared/ui/home-header/home-header';
import {MonumentListDto} from '@api/model/monument-list-dto';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-popular-section',
  standalone: true,
  imports: [CommonModule, EntityCardComponent, HomeHeaderComponent, TranslateModule],
  template: `
    <section class="py-12 sm:py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <app-home-header
          [badge]="'home-popular-section.badge' | translate"
          [title]="'home-popular-section.title' | translate"
          [subtitle]="'home-popular-section.subtitle' | translate"
        />

        <div class="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          @for (monument of monuments; track monument.id) {
            <app-entity-card
              [iconType]="'city'"
              [cover]="getImageUrl(monument)"
              [title]="monument.name || ('home-popular-section.unknown' | translate)"
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
  @Input() monuments: MonumentListDto[] = [];

  getImageUrl(monument: MonumentListDto): string {
    return ImageUtils.getImageUrl(monument.coverId, 'assets/placeholder.png');
  }
}
