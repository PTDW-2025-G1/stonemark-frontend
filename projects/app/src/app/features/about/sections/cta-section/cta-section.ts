import { Component } from '@angular/core';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  template: `
    <section class="py-24 px-6 bg-surface border-t border-border">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-serif mb-4">
          Join Us in Preserving History
        </h2>
        <p class="text-text-muted mb-12 max-w-3xl mx-auto">
          Be part of a global movement to document and protect the craft traditions that shaped our world
        </p>

        <div class="flex flex-col md:flex-row gap-4 justify-center mb-16">
          <a href="/search/monuments" class="px-8 py-4 text-sm font-bold tracking-wide border border-primary bg-primary text-primary-foreground rounded-lg hover:bg-surface hover:text-primary hover:border-primary transition-colors duration-200 ease-soft shadow-sm">
            Start Exploring
          </a>
          <a href="/contact" class="px-8 py-4 text-sm font-bold tracking-wide border border-border bg-surface text-text rounded-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200 ease-soft shadow-sm">
            Get in Touch
          </a>
        </div>

        <p class="text-text-muted italic">
          Open collaboration ensures the project remains transparent, reliable, and useful to both the public and the academic community.
        </p>
      </div>
    </section>
  `
})
export class CtaSectionComponent {}
