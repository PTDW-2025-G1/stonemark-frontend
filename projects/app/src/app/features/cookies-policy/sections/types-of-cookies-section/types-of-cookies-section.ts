import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-types-of-cookies-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">

      <div class="flex items-center gap-3 mb-4">
        <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">
          Types of Cookies We Use
        </h2>
      </div>

      <!-- Essential Cookies -->
      <div class="mb-6">
        <h3 class="text-xl font-bold text-text mb-2 flex items-center gap-2">
          1. Essential Cookies
        </h3>
        <p class="text-text-muted leading-relaxed mb-3">
          These cookies are strictly necessary for the operation of our platform. They enable core functionality such as security, authentication, and accessibility features.
        </p>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <p class="text-sm font-semibold text-text mb-2">Examples:</p>

          <ul class="text-sm text-text-muted space-y-1 pl-4">
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>Authentication tokens to keep you logged in</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>Session management and security verification</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>Load balancing to ensure platform stability</span>
            </li>
          </ul>

          <p class="text-xs text-text-muted mt-3 italic">
            These cookies cannot be disabled as they are essential for the platform to function properly.
          </p>
        </div>
      </div>

      <!-- Functional Cookies -->
      <div class="mb-6">
        <h3 class="text-xl font-bold text-text mb-2 flex items-center gap-2">
          2. Functional Cookies
        </h3>
        <p class="text-text-muted leading-relaxed mb-3">
          These cookies allow us to remember your preferences and choices to provide you with a more personalized experience.
        </p>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <p class="text-sm font-semibold text-text mb-2">Examples:</p>

          <ul class="text-sm text-text-muted space-y-1 pl-4">
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>Language and region preferences</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>Display settings and accessibility options</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>Recently viewed monuments and marks</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>Bookmarked content and saved searches</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Analytics Cookies -->
      <div class="mb-6">
        <h3 class="text-xl font-bold text-text mb-2 flex items-center gap-2">
          3. Analytics Cookies
        </h3>
        <p class="text-text-muted leading-relaxed mb-3">
          These cookies help us understand how visitors interact with our platform by collecting anonymous information about usage patterns and performance.
        </p>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <p class="text-sm font-semibold text-text mb-2">Examples:</p>

          <ul class="text-sm text-text-muted space-y-1 pl-4">
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>Page views, session duration, and bounce rates</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>Popular features and most-viewed content</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>Traffic sources and user journeys</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>Error tracking and performance monitoring</span>
            </li>
          </ul>

          <p class="text-xs text-text-muted mt-3">
            We use services like Google Analytics to collect this data. All analytics data is anonymized and aggregated.
          </p>
        </div>
      </div>

      <!-- Marketing Cookies -->
      <div>
        <h3 class="text-xl font-bold text-text mb-2 flex items-center gap-2">
          4. Marketing Cookies
        </h3>
        <p class="text-text-muted leading-relaxed mb-3">
          These cookies are used to deliver relevant advertisements and measure the effectiveness of marketing campaigns.
        </p>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <p class="text-sm font-semibold text-text mb-2">Examples:</p>

          <ul class="text-sm text-text-muted space-y-1 pl-4">
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>Personalized content recommendations</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>Social media integration and sharing features</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>Advertisement performance tracking</span>
            </li>
          </ul>

          <p class="text-xs text-text-muted mt-3">
            You can opt out of marketing cookies through your cookie preferences.
          </p>
        </div>
      </div>

    </section>
  `
})
export class TypesOfCookiesSection {}
