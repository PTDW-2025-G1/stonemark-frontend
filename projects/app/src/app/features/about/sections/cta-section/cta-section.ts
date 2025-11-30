import { Component } from '@angular/core';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  template: `
    <section class="py-16 sm:py-20 lg:py-28">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text mb-6">
          Join Us in Preserving History
        </h2>
        <p class="text-lg sm:text-xl text-text-muted mb-8 sm:mb-12">
          Be part of a global movement to document and protect the craft traditions that shaped our world
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/search/monuments" class="px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl">
            Start Exploring
          </a>
          <a href="/contact" class="px-8 py-4 bg-surface-alt border-2 border-border text-text rounded-xl hover:border-primary transition-all duration-300 font-semibold text-lg">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  `
})
export class CtaSectionComponent {}
