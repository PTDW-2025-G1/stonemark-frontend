import { Component } from '@angular/core';

@Component({
  selector: 'app-mission-section',
  standalone: true,
  template: `
    <div class="border-t border-border">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
        <div class="p-12 md:p-24 flex flex-col justify-center">
          <span class="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Our Mission</span>
          <h3 class="text-3xl md:text-4xl font-serif mb-6">Bridging Past & Present</h3>
          <p class="text-text-muted leading-relaxed mb-6">
            The project combines <strong class="text-text">cultural heritage</strong>, <strong class="text-text">field
            data collection</strong>, and <strong class="text-text">digital technology</strong> to preserve the invisible traces of
            architectural tradition.
          </p>
          <p class="text-text-muted leading-relaxed">
            Every stonemason mark tells a story - of the craftsman who carved it, the guild they belonged to,
            and the monument they helped build. Stone Mark brings these stories to light.
          </p>
        </div>
        <div class="border-l-0 md:border-l border-border bg-surface-muted relative min-h-[400px]">
          <img
            src="assets/images/about_1.png"
            alt="Stone carving detail"
            class="w-full h-full object-cover absolute inset-0 mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>
    </div>
  `
})
export class MissionSectionComponent {}
