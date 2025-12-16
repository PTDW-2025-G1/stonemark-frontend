import { Component } from '@angular/core';

@Component({
  selector: 'app-features-section',
  standalone: true,
  template: `
    <section class="py-24 px-6 max-w-7xl mx-auto border-t border-border">
      <div class="text-center mb-16">
        <div class="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Key Features</div>
        <h2 class="text-4xl md:text-5xl font-serif">Tools for Heritage Explorers</h2>
        <p class="max-w-3xl mx-auto mt-4 text-text-muted">
          Designed to make your journey through history seamless, engaging, and unforgettable
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">01</div>
          <h3 class="text-2xl font-serif mb-3">Capture & Submit Marks</h3>
          <p class="text-text-muted leading-relaxed">
            Photograph and submit authentic stonemason marks directly from the app, contributing to a growing digital archive of craftsmanship heritage.
          </p>
        </div>
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">02</div>
          <h3 class="text-2xl font-serif mb-3">Search Monuments</h3>
          <p class="text-text-muted leading-relaxed">
            Discover monuments and stonemason symbols through a fast and intuitive search experience.
          </p>
        </div>
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">03</div>
          <h3 class="text-2xl font-serif mb-3">Advanced Filtering</h3>
          <p class="text-text-muted leading-relaxed">
            Filter marks by monument, guild, geometric shape, or other visual traits to explore detailed cultural patterns and associations.
          </p>
        </div>
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">04</div>
          <h3 class="text-2xl font-serif mb-3">Bookmarks & Collections</h3>
          <p class="text-text-muted leading-relaxed">
            Save your favourite monuments or marks to personalized collections — perfect for research, teaching, or exploration.
          </p>
        </div>
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">05</div>
          <h3 class="text-2xl font-serif mb-3">Geolocation on Map</h3>
          <p class="text-text-muted leading-relaxed">
            Explore nearby stonemason marks and monuments in real-time using an interactive map with precise geolocation features.
          </p>
        </div>
        <div class="relative pl-8">
          <div class="absolute left-0 top-1 text-primary font-serif text-xl">06</div>
          <h3 class="text-2xl font-serif mb-3">Cultural Preservation</h3>
          <p class="text-text-muted leading-relaxed">
            Support the documentation and preservation of stonemason heritage through community participation and open historical data.
          </p>
        </div>
      </div>
    </section>
  `
})
export class FeaturesSectionComponent {}
