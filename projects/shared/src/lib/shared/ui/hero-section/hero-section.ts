// src/app/shared/ui/hero-section/hero-section.ts
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
          <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-serif font-bold mb-6 sm:mb-8">
            <ng-container *ngFor="let line of titleLines; let last = last">
              <span>{{ line }}</span><br *ngIf="!last">
            </ng-container>
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
