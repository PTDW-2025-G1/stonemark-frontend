import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  template: `
    <section class="pt-32 pb-20 md:pt-20 md:pb-32 px-6 bg-surface text-text">
      <div class="max-w-4xl mx-auto text-center">
        <div class="inline-block border border-border px-3 py-1 text-xs uppercase tracking-widest font-bold mb-6 bg-surface-alt">
          About the Project
        </div>
        <h1 class="text-5xl md:text-7xl font-serif font-medium leading-[1.1] mb-8">
          Preserving <span class="italic">History</span>,<br/>One Mark at a Time.
        </h1>
        <p class="text-lg text-text-muted leading-relaxed max-w-3xl mx-auto">
          Stone Mark is a web application dedicated to the documentation and exploration of stonemason marks -
          the unique symbols engraved by ancient craftsmen on monuments across history.
        </p>
      </div>
    </section>
  `
})
export class HeroSectionComponent {}
