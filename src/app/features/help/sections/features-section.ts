import { Component } from '@angular/core';

@Component({
  selector: 'app-features-section',
  template: `
    <div class="max-w-6xl mx-auto py-20 px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4">Why Choose Stone Mark?</h2>
      </div>
      <div class="grid md:grid-cols-2 gap-12">
        <!-- Feature 1 -->
        <div class="flex gap-6 p-6 bg-surface-alt rounded-2xl hover:shadow-lg transition-shadow">
          <div class="flex-shrink-0">
            <div class="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
              <i class="bi bi-globe-europe-africa text-3xl text-primary"></i>
            </div>
          </div>
          <div>
            <h3 class="text-2xl font-semibold mb-3">Explore Monuments</h3>
            <p class="text-text-muted leading-relaxed">
              Navigate through an extensive database of historical monuments and discover the marks left by craftsmen.
            </p>
          </div>
        </div>
        <!-- Feature 2 -->
        <div class="flex gap-6 p-6 bg-surface-alt rounded-2xl hover:shadow-lg transition-shadow">
          <div class="flex-shrink-0">
            <div class="w-16 h-16 bg-info/10 rounded-xl flex items-center justify-center">
              <i class="bi bi-hammer text-3xl text-info"></i>
            </div>
          </div>
          <div>
            <h3 class="text-2xl font-semibold mb-3">Discover Marks</h3>
            <p class="text-text-muted leading-relaxed">
              Explore a living archive of stonemason marks scattered across monuments and heritage sites.
            </p>
          </div>
        </div>
        <!-- Feature 3 -->
        <div class="flex gap-6 p-6 bg-surface-alt rounded-2xl hover:shadow-lg transition-shadow">
          <div class="flex-shrink-0">
            <div class="w-16 h-16 bg-success/10 rounded-xl flex items-center justify-center">
              <i class="bi bi-geo-alt-fill text-3xl text-success"></i>
            </div>
          </div>
          <div>
            <h3 class="text-2xl font-semibold mb-3">Location Mapping</h3>
            <p class="text-text-muted leading-relaxed">
              Every submission is automatically geotagged, creating a comprehensive map of cultural heritage markers.
            </p>
          </div>
        </div>
        <!-- Feature 4 -->
        <div class="flex gap-6 p-6 bg-surface-alt rounded-2xl hover:shadow-lg transition-shadow">
          <div class="flex-shrink-0">
            <div class="w-16 h-16 bg-warning/10 rounded-xl flex items-center justify-center">
              <i class="bi bi-graph-up-arrow text-3xl text-warning"></i>
            </div>
          </div>
          <div>
            <h3 class="text-2xl font-semibold mb-3">Track Your Impact</h3>
            <p class="text-text-muted leading-relaxed">
              Monitor your submissions from your personal dashboard and see your contributions.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class FeaturesSectionComponent {}
