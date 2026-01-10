import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cookie-retention-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">

      <div class="flex items-center gap-3 mb-4">
        <h2 class="font-serif text-2xl lg:text-3xl font-medium text-text">
          {{ 'cookies_policy.retention.title' | translate }}
        </h2>
      </div>

      <p class="text-text-muted leading-relaxed mb-4">
        {{ 'cookies_policy.retention.desc' | translate }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div class="bg-surface rounded-xl p-4 border border-border">
          <h4 class="font-bold text-text mb-2">{{ 'cookies_policy.retention.session.title' | translate }}</h4>
          <p class="text-sm text-text-muted">{{ 'cookies_policy.retention.session.desc' | translate }}</p>
        </div>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <h4 class="font-bold text-text mb-2">{{ 'cookies_policy.retention.persistent.title' | translate }}</h4>
          <p class="text-sm text-text-muted">{{ 'cookies_policy.retention.persistent.desc' | translate }}</p>
        </div>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <h4 class="font-bold text-text mb-2">{{ 'cookies_policy.retention.authentication.title' | translate }}</h4>
          <p class="text-sm text-text-muted">{{ 'cookies_policy.retention.authentication.desc' | translate }}</p>
        </div>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <h4 class="font-bold text-text mb-2">{{ 'cookies_policy.retention.analytics.title' | translate }}</h4>
          <p class="text-sm text-text-muted">{{ 'cookies_policy.retention.analytics.desc' | translate }}</p>
        </div>

      </div>

    </section>
  `
})
export class CookieRetentionSection {}
