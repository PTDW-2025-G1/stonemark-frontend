import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common';
import { EntityCardComponent } from '@shared/ui/entity-card/entity-card';
import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { ImageUtils } from '@shared/utils/image.utils';
import {HomeHeaderComponent} from '@shared/ui/home-header/home-header';
import {MarkOccurrenceListDto} from '@api/model/mark-occurrence-list-dto';
import {DateUtils} from '@shared/utils/date.utils';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-last-marks-section',
  standalone: true,
  imports: [CommonModule, EntityCardComponent, HomeHeaderComponent, TranslateModule],
  template: `
    <section class="py-12 sm:py-16 lg:py-24 bg-surface">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <app-home-header
          [badge]="'home-last-marks-section.badge' | translate"
          [title]="'home-last-marks-section.title' | translate"
          [subtitle]="'home-last-marks-section.subtitle' | translate"
        />

        <div class="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          @for (occurrence of lastOccurrences; track occurrence.id) {
            <app-entity-card
              [iconType]="'time'"
              [cover]="getImageUrl(occurrence)"
              [subtitle]="formatDate(occurrence.publishedAt)"
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
  @Input() lastOccurrences: MarkOccurrenceListDto[] = [];

  formatDate(date: string | undefined): string {
    return DateUtils.formatShortDate(date);
  }

  getImageUrl(occurrence: MarkOccurrenceDto): string {
    return ImageUtils.getImageUrl(
      occurrence.mark?.coverId,
      'assets/placeholder.png'
    );
  }
}

