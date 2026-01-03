import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmarks-header-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="border-b border-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p class="text-sm text-text-muted mb-1">
              Showing {{ rangeStart }}-{{ rangeEnd }} of {{ total }}
            </p>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-serif text-text leading-tight">
              {{ title }}
            </h1>
            @if (subtitle) {
              <p class="text-base text-text-muted mt-1 leading-snug">
                {{ subtitle }}
              </p>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeaderSectionComponent {
  @Input() rangeStart = 1;
  @Input() rangeEnd = 1;
  @Input() total = 0;
  @Input() title = '';
  @Input() subtitle = '';
}
