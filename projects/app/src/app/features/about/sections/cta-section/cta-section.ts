import { Component } from '@angular/core';
import { ButtonComponent } from '@shared/ui/button/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
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
          <app-button
            variant="primary"
            size="normal"
            [routerLink]="'/search/monuments'"
          >
            Start Exploring
          </app-button>
          <app-button
            variant="secondary"
            size="normal"
            [routerLink]="'/contact'"
          >
            Get in Touch
          </app-button>
        </div>

        <p class="text-text-muted italic">
          Open collaboration ensures the project remains transparent, reliable, and useful to both the public and the academic community.
        </p>
      </div>
    </section>
  `
})
export class CtaSectionComponent {}
