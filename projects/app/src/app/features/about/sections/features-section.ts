import { Component } from '@angular/core';
import {FeatureCardComponent} from '../../../../../projects/shared/src/lib/shared/ui/feature-card/feature-card';

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [
    FeatureCardComponent
  ],
  template: `
    <section class="py-16 sm:py-20 lg:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 sm:mb-16 lg:mb-20">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <i class="bi bi-stars text-primary"></i>
            <span class="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text mb-4">
            Powerful Features for Every Explorer
          </h2>
          <p class="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto">
            Designed to make your journey through history seamless, engaging, and unforgettable
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <app-feature-card
            icon="bi bi-camera-fill"
            title="Capture & Submit Marks"
            description="Photograph and submit authentic stonemason marks directly from the app, contributing to a growing digital archive of craftsmanship heritage."
          ></app-feature-card>
          <app-feature-card
            icon="bi bi-search"
            title="Search Monuments"
            description="Discover monuments and stonemason symbols through a fast and intuitive search experience."
          ></app-feature-card>
          <app-feature-card
            icon="bi bi-funnel-fill"
            title="Advanced Filtering"
            description="Filter marks by monument, guild, geometric shape, or other visual traits to explore detailed cultural patterns and associations."
          ></app-feature-card>
          <app-feature-card
            icon="bi bi-bookmark-fill"
            title="Bookmarks & Collections"
            description="Save your favourite monuments, or marks to personalized collections — perfect for research, teaching, or exploration."
          ></app-feature-card>
          <app-feature-card
            icon="bi bi-geo-alt-fill"
            title="Geolocation on Map"
            description="Explore nearby stonemason marks and monuments in real-time using an interactive map with precise geolocation features."
          ></app-feature-card>
          <app-feature-card
            icon="bi bi-shield-check"
            title="Cultural Preservation"
            description="Support the documentation and preservation of stonemason heritage through community participation and open historical data."
          ></app-feature-card>
        </div>
      </div>
    </section>
  `
})
export class FeaturesSectionComponent {}
