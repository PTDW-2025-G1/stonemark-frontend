import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  template: `
    <section class="relative overflow-hidden text-primary">
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div class="max-w-4xl">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <i class="bi bi-info-circle"></i>
            <span class="text-sm font-medium">About the Project</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-6 sm:mb-8">
            Preserving History,<br>One Mark at a Time
          </h1>

          <p class="text-lg sm:text-xl lg:text-2xl text-primary leading-relaxed max-w-3xl">
            Stone Mark is a web application dedicated to the documentation and exploration of stonemason marks -
            the unique symbols engraved by ancient craftsmen on monuments across history.
          </p>
        </div>
      </div>
    </section>
  `
})
export class HeroSectionComponent {}
