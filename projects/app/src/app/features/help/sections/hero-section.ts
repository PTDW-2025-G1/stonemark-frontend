import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  template: `
    <section class="pt-32 pb-20 md:pt-40 md:pb-32 px-6 bg-surface text-text">
      <div class="max-w-4xl mx-auto text-center">
        <div class="inline-block border border-border px-3 py-1 text-xs uppercase tracking-widest font-bold mb-6 bg-surface-alt">
          Help & Guide
        </div>
        <h1 class="text-5xl md:text-7xl font-serif font-medium leading-[1.1] mb-8">
          Discover. <span class="italic">Capture</span>.<br/>Preserve.
        </h1>
        <p class="text-lg text-text-muted leading-relaxed max-w-3xl mx-auto">
          Every mark tells a story. Join thousands of explorers preserving cultural heritage,
          one stone mark at a time.
        </p>
      </div>
    </section>
  `,
})
export class HeroSectionComponent {}
