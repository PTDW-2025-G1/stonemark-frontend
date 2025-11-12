import { Component } from '@angular/core';
import {HighlightCardComponent} from '../../../../../projects/shared/src/lib/shared/ui/highlight-card/highlight-card';

@Component({
  selector: 'app-unesco-section',
  standalone: true,
  imports: [
    HighlightCardComponent
  ],
  template: `
    <section class="py-16 sm:py-20 lg:py-28 bg-white text-black relative overflow-hidden">
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 sm:mb-16">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 bg-black/10 backdrop-blur-sm rounded-full mb-6 border border-black/20">
            <i class="bi bi-globe"></i>
            <span class="text-sm font-medium uppercase tracking-wider">Global Initiative</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold mb-6">
            Partnering with UNESCO
          </h2>
          <p class="text-lg sm:text-xl text-black/80 max-w-3xl mx-auto leading-relaxed">
            Stone Mark is being developed in collaboration with UNESCO to preserve and promote world heritage sites.
            With proven technology and a scalable architecture, we're preparing for international expansion.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <app-highlight-card
            icon="bi bi-award"
            title="UNESCO Partnership"
            description="Official collaboration for heritage preservation"
          ></app-highlight-card>
          <app-highlight-card
            icon="bi bi-globe2"
            title="Global Expansion"
            description="Deployment across multiple countries"
          ></app-highlight-card>
          <app-highlight-card
            icon="bi bi-people"
            title="Cultural Impact"
            description="Empowering millions to connect with heritage"
          ></app-highlight-card>
          <app-highlight-card
            icon="bi bi-graph-up"
            title="Sustainable Growth"
            description="Built for scale with proven architecture"
          ></app-highlight-card>
        </div>
      </div>
    </section>
  `
})
export class UnescoSectionComponent {}
