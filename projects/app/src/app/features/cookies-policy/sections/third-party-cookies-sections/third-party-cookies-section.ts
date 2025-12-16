import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-third-party-cookies-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">

      <div class="flex items-center gap-3 mb-4">
        <h2 class="font-serif text-2xl lg:text-3xl font-medium text-text">
          Third-Party Cookies
        </h2>
      </div>

      <p class="text-text-muted leading-relaxed mb-4">
        In addition to our own cookies, we may use third-party services that set their own cookies. These include:
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div class="bg-surface rounded-xl p-4 border border-border">
          <h4 class="font-bold text-text mb-2 flex items-center gap-2">
            <i class="bi bi-bar-chart text-primary"></i>
            Google Analytics
          </h4>
          <p class="text-sm text-text-muted">For website analytics and performance monitoring</p>
        </div>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <h4 class="font-bold text-text mb-2 flex items-center gap-2">
            <i class="bi bi-map text-primary"></i>
            Mapping Services
          </h4>
          <p class="text-sm text-text-muted">For interactive maps and location features</p>
        </div>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <h4 class="font-bold text-text mb-2 flex items-center gap-2">
            <i class="bi bi-share text-primary"></i>
            Social Media Platforms
          </h4>
          <p class="text-sm text-text-muted">For social sharing and authentication</p>
        </div>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <h4 class="font-bold text-text mb-2 flex items-center gap-2">
            <i class="bi bi-shield-check text-primary"></i>
            Security Services
          </h4>
          <p class="text-sm text-text-muted">For fraud prevention and security monitoring</p>
        </div>

      </div>

      <p class="text-sm text-text-muted mt-4 italic">
        Please note that we do not control these third-party cookies. We recommend reviewing the privacy policies of these services for more information.
      </p>

    </section>
  `
})
export class ThirdPartyCookiesSection {}
