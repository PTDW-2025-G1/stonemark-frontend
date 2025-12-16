import { Component } from '@angular/core';

@Component({
  selector: 'app-features-section',
  standalone: true,
  template: `
    <section class="py-24 px-6 max-w-7xl mx-auto border-t border-border">
      <div class="text-center mb-16">
        <div class="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Key Features</div>
        <h2 class="text-4xl md:text-5xl font-serif">Why Choose Stone Mark?</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">01</div>
          <h3 class="text-2xl font-serif mb-3">Explore Monuments</h3>
          <p class="text-text-muted leading-relaxed">
            Navigate through an extensive database of historical monuments and discover the marks left by craftsmen.
          </p>
        </div>
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">02</div>
          <h3 class="text-2xl font-serif mb-3">Discover Marks</h3>
          <p class="text-text-muted leading-relaxed">
            Explore a living archive of stonemason marks scattered across monuments and heritage sites.
          </p>
        </div>
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">03</div>
          <h3 class="text-2xl font-serif mb-3">Location Mapping</h3>
          <p class="text-text-muted leading-relaxed">
            Every submission is automatically geotagged, creating a comprehensive map of cultural heritage markers.
          </p>
        </div>
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">04</div>
          <h3 class="text-2xl font-serif mb-3">Track Your Impact</h3>
          <p class="text-text-muted leading-relaxed">
            Monitor your submissions from your personal dashboard and see your contributions.
          </p>
        </div>
      </div>
    </section>
  `,
})
export class FeaturesSectionComponent {}
