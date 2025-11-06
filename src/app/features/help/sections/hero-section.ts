import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  template: `
    <div class="relative py-20 text-center overflow-hidden mt-10">
      <div class="absolute inset-0 opacity-5">
        <i class="bi bi-geo-alt-fill text-9xl"></i>
      </div>
      <div class="relative z-10">
        <i class="bi bi-bank2 text-6xl text-primary mb-4"></i>
        <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Discover. Capture. Preserve.
        </h1>
        <p class="max-w-3xl mx-auto text-xl text-text-muted px-6 leading-relaxed">
          Every mark tells a story. Join thousands of explorers preserving cultural heritage,
          one stone mark at a time.
        </p>
      </div>
    </div>
  `,
})
export class HeroSectionComponent {}
