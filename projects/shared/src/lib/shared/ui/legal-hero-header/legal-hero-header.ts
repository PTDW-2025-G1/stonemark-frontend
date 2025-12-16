import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-legal-hero-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="flex flex-col gap-2" [class.mb-10]="margin">
      <p class="text-xs font-semibold tracking-widest uppercase text-primary">
        Stonemark Legal
      </p>

      <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-text leading-tight">
        {{ title }}
      </h1>

      <p class="text-base text-text-muted">
        Last updated: {{ lastUpdated }}
      </p>
    </header>
  `
})
export class LegalHeroHeaderComponent {
  @Input() title!: string;
  @Input() lastUpdated!: string;
  @Input() margin: boolean = true;
}
