import { Component } from '@angular/core';
import {MissionCardComponent} from '../../../../../projects/shared/src/lib/shared/ui/mission-card/mission-card';

@Component({
  selector: 'app-mission-section',
  standalone: true,
  imports: [
    MissionCardComponent
  ],
  template: `
    <section class="py-16 sm:py-20 lg:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text mb-6">
              Our Mission
            </h2>
            <div class="space-y-4 text-base sm:text-lg text-text-muted leading-relaxed">
              <p>
                The project combines <strong class="text-text">cultural heritage</strong>, <strong class="text-text">field
                data collection</strong>,
                and <strong class="text-text">digital technology</strong> to preserve the invisible traces of
                architectural tradition.
              </p>
              <p>
                Every stonemason mark tells a story - of the craftsman who carved it, the guild they belonged to,
                and the monument they helped build. Stone Mark brings these stories to light.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 sm:gap-6">
            <app-mission-card
              icon="bi bi-camera"
              title="Capture"
              description="Document marks in the field"
            ></app-mission-card>
            <app-mission-card
              icon="bi bi-search"
              title="Discover"
              description="Explore historical context"
              [offset]="true"
            ></app-mission-card>
            <app-mission-card
              icon="bi bi-geo-alt"
              title="Map"
              description="Geolocate monuments"
            ></app-mission-card>
            <app-mission-card
              icon="bi bi-shield-check"
              title="Preserve"
              description="Safeguard heritage"
              [offset]="true"
            ></app-mission-card>
          </div>
        </div>
      </div>
    </section>
  `
})
export class MissionSectionComponent {}
