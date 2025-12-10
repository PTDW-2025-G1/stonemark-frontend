import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative text-primary overflow-hidden">
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <i [class]="icon"></i>
            <span class="text-sm font-medium">{{ badge }}</span>
          </div>
          <h1 class="text-5xl md:text-7xl font-serif font-medium leading-[1.1] mb-8">
            @for (line of titleLines; track line; let last = $last) {
              <span>{{ line }}</span>
              @if (!last) {
                <br>
              }
            }
          </h1>
          <p class="text-lg sm:text-xl text-primary leading-relaxed">
            {{ subtitle }}
          </p>
        </div>
      </div>
    </section>
  `
})
export class SharedHeroSectionComponent {
  @Input() icon = 'bi bi-info-circle';
  @Input() badge = '';
  @Input() titleLines: string[] = [];
  @Input() subtitle = '';
}
