import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-third-party-cookies-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">

      <div class="flex items-center gap-3 mb-4">
        <h2 class="font-serif text-2xl lg:text-3xl font-medium text-text">
          {{ 'cookies_policy.third_party.title' | translate }}
        </h2>
      </div>

      <p class="text-text-muted leading-relaxed mb-4">
        {{ 'cookies_policy.third_party.desc' | translate }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div class="bg-surface rounded-xl p-4 border border-border">
          <h4 class="font-bold text-text mb-2 flex items-center gap-2">
            <i class="bi bi-bar-chart text-primary"></i>
            {{ 'cookies_policy.third_party.google_analytics.title' | translate }}
          </h4>
          <p class="text-sm text-text-muted">{{ 'cookies_policy.third_party.google_analytics.desc' | translate }}</p>
        </div>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <h4 class="font-bold text-text mb-2 flex items-center gap-2">
            <i class="bi bi-map text-primary"></i>
            {{ 'cookies_policy.third_party.mapping.title' | translate }}
          </h4>
          <p class="text-sm text-text-muted">{{ 'cookies_policy.third_party.mapping.desc' | translate }}</p>
        </div>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <h4 class="font-bold text-text mb-2 flex items-center gap-2">
            <i class="bi bi-share text-primary"></i>
            {{ 'cookies_policy.third_party.social_media.title' | translate }}
          </h4>
          <p class="text-sm text-text-muted">{{ 'cookies_policy.third_party.social_media.desc' | translate }}</p>
        </div>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <h4 class="font-bold text-text mb-2 flex items-center gap-2">
            <i class="bi bi-shield-check text-primary"></i>
            {{ 'cookies_policy.third_party.security.title' | translate }}
          </h4>
          <p class="text-sm text-text-muted">{{ 'cookies_policy.third_party.security.desc' | translate }}</p>
        </div>

      </div>

      <p class="text-sm text-text-muted mt-4 italic">
        {{ 'cookies_policy.third_party.note' | translate }}
      </p>

    </section>
  `
})
export class ThirdPartyCookiesSection {}
