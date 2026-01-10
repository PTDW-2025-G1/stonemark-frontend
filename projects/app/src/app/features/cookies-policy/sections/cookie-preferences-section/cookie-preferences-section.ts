import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-managing-cookie-preferences-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">

      <div class="flex items-center gap-3 mb-4">
        <i class="bi bi-sliders text-primary text-2xl"></i>
        <h2 class="font-serif text-2xl lg:text-3xl font-medium text-text">
          {{ 'cookies_policy.managing_preferences.title' | translate }}
        </h2>
      </div>

      <p class="text-text-muted leading-relaxed mb-4">
        {{ 'cookies_policy.managing_preferences.desc' | translate }}
      </p>

      <div class="space-y-4">

        <!-- Browser Settings -->
        <div class="bg-surface rounded-xl p-5 border border-border">
          <h4 class="font-bold text-text mb-3 flex items-center gap-2">
            <i class="bi bi-browser-chrome text-primary"></i>
            {{ 'cookies_policy.managing_preferences.browser_settings.title' | translate }}
          </h4>

          <p class="text-sm text-text-muted mb-3">
            {{ 'cookies_policy.managing_preferences.browser_settings.desc' | translate }}
          </p>

          <ul class="text-sm text-text-muted space-y-2 pl-4">
            <li class="flex items-start gap-2">
              <span class="text-primary">•</span>
              <span>{{ 'cookies_policy.managing_preferences.browser_settings.item1' | translate }}</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">•</span>
              <span>{{ 'cookies_policy.managing_preferences.browser_settings.item2' | translate }}</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">•</span>
              <span>{{ 'cookies_policy.managing_preferences.browser_settings.item3' | translate }}</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">•</span>
              <span>{{ 'cookies_policy.managing_preferences.browser_settings.item4' | translate }}</span>
            </li>
          </ul>
        </div>

        <!-- Cookie Banner -->
        <div class="bg-surface rounded-xl p-5 border border-border">
          <h4 class="font-bold text-text mb-3 flex items-center gap-2">
            <i class="bi bi-toggles text-primary"></i>
            {{ 'cookies_policy.managing_preferences.consent_banner.title' | translate }}
          </h4>
          <p class="text-sm text-text-muted">
            {{ 'cookies_policy.managing_preferences.consent_banner.desc' | translate }}
          </p>
        </div>

        <!-- Opt-Out Links -->
        <div class="bg-surface rounded-xl p-5 border border-border">
          <h4 class="font-bold text-text mb-3 flex items-center gap-2">
            <i class="bi bi-box-arrow-right text-primary"></i>
            {{ 'cookies_policy.managing_preferences.third_party_opt_out.title' | translate }}
          </h4>

          <p class="text-sm text-text-muted mb-2">
            {{ 'cookies_policy.managing_preferences.third_party_opt_out.desc' | translate }}
          </p>

          <ul class="text-sm space-y-1">
            <li>
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener"
                 class="text-primary font-semibold hover:underline">
                {{ 'cookies_policy.managing_preferences.third_party_opt_out.google_analytics' | translate }}
              </a>
            </li>
            <li>
              <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener"
                 class="text-primary font-semibold hover:underline">
                {{ 'cookies_policy.managing_preferences.third_party_opt_out.online_choices' | translate }}
              </a>
            </li>
            <li>
              <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener"
                 class="text-primary font-semibold hover:underline">
                {{ 'cookies_policy.managing_preferences.third_party_opt_out.nai' | translate }}
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div class="mt-6 p-4 bg-warning/10 border border-warning/30 rounded-xl">
        <p class="text-sm text-text-muted">
          <strong class="text-primary">{{ 'cookies_policy.managing_preferences.important' | translate }}</strong> {{ 'cookies_policy.managing_preferences.important_note' | translate }}
        </p>
      </div>

    </section>
  `
})
export class ManagingCookiePreferencesSection {}
