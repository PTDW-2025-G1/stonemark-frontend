import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityCardComponent } from '@shared/ui/entity-card/entity-card';
import {Mark} from '@core/models/mark.model';

@Component({
  selector: 'app-last-marks-section',
  standalone: true,
  imports: [CommonModule, EntityCardComponent],
  template: `
    <section class="py-12 sm:py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10 sm:mb-12 lg:mb-16">
          <p class="text-xs sm:text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">
            Marks
          </p>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-text">
            Last Marks Discovered
          </h2>
        </div>

        <div class="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          @for (mark of marks; track mark.id) {
            <app-entity-card
              [image]="mark.image"
              [title]="mark.title"
              [location]="mark.location"
            />
          }
        </div>
      </div>
    </section>
  `
})
export class LastMarkSectionComponent {
  @Input() marks: Mark[] = [];
}
