import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-types-of-cookies-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">

      <div class="flex items-center gap-3 mb-4">
        <h2 class="font-serif text-2xl lg:text-3xl font-medium text-text">
          {{ 'cookies_policy.types_of_cookies.title' | translate }}
        </h2>
      </div>

      <!-- Essential Cookies -->
      <div class="mb-6">
        <h3 class="text-xl font-bold text-text mb-2 flex items-center gap-2">
          {{ 'cookies_policy.types_of_cookies.essential.title' | translate }}
        </h3>
        <p class="text-text-muted leading-relaxed mb-3">
          {{ 'cookies_policy.types_of_cookies.essential.desc' | translate }}
        </p>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <p class="text-sm font-semibold text-text mb-2">{{ 'cookies_policy.types_of_cookies.essential.examples_title' | translate }}</p>

          <ul class="text-sm text-text-muted space-y-1 pl-4">
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>{{ 'cookies_policy.types_of_cookies.essential.example1' | translate }}</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>{{ 'cookies_policy.types_of_cookies.essential.example2' | translate }}</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>{{ 'cookies_policy.types_of_cookies.essential.example3' | translate }}</span>
            </li>
          </ul>

          <p class="text-xs text-text-muted mt-3 italic">
            {{ 'cookies_policy.types_of_cookies.essential.note' | translate }}
          </p>
        </div>
      </div>

      <!-- Functional Cookies -->
      <div class="mb-6">
        <h3 class="text-xl font-bold text-text mb-2 flex items-center gap-2">
          {{ 'cookies_policy.types_of_cookies.functional.title' | translate }}
        </h3>
        <p class="text-text-muted leading-relaxed mb-3">
          {{ 'cookies_policy.types_of_cookies.functional.desc' | translate }}
        </p>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <p class="text-sm font-semibold text-text mb-2">{{ 'cookies_policy.types_of_cookies.functional.examples_title' | translate }}</p>

          <ul class="text-sm text-text-muted space-y-1 pl-4">
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>{{ 'cookies_policy.types_of_cookies.functional.example1' | translate }}</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>{{ 'cookies_policy.types_of_cookies.functional.example2' | translate }}</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>{{ 'cookies_policy.types_of_cookies.functional.example3' | translate }}</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>{{ 'cookies_policy.types_of_cookies.functional.example4' | translate }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Analytics Cookies -->
      <div class="mb-6">
        <h3 class="text-xl font-bold text-text mb-2 flex items-center gap-2">
          {{ 'cookies_policy.types_of_cookies.analytics.title' | translate }}
        </h3>
        <p class="text-text-muted leading-relaxed mb-3">
          {{ 'cookies_policy.types_of_cookies.analytics.desc' | translate }}
        </p>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <p class="text-sm font-semibold text-text mb-2">{{ 'cookies_policy.types_of_cookies.analytics.examples_title' | translate }}</p>

          <ul class="text-sm text-text-muted space-y-1 pl-4">
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>{{ 'cookies_policy.types_of_cookies.analytics.example1' | translate }}</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>{{ 'cookies_policy.types_of_cookies.analytics.example2' | translate }}</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>{{ 'cookies_policy.types_of_cookies.analytics.example3' | translate }}</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>{{ 'cookies_policy.types_of_cookies.analytics.example4' | translate }}</span>
            </li>
          </ul>

          <p class="text-xs text-text-muted mt-3">
            {{ 'cookies_policy.types_of_cookies.analytics.note' | translate }}
          </p>
        </div>
      </div>

      <!-- Marketing Cookies -->
      <div>
        <h3 class="text-xl font-bold text-text mb-2 flex items-center gap-2">
          {{ 'cookies_policy.types_of_cookies.marketing.title' | translate }}
        </h3>
        <p class="text-text-muted leading-relaxed mb-3">
          {{ 'cookies_policy.types_of_cookies.marketing.desc' | translate }}
        </p>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <p class="text-sm font-semibold text-text mb-2">{{ 'cookies_policy.types_of_cookies.marketing.examples_title' | translate }}</p>

          <ul class="text-sm text-text-muted space-y-1 pl-4">
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>{{ 'cookies_policy.types_of_cookies.marketing.example1' | translate }}</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>{{ 'cookies_policy.types_of_cookies.marketing.example2' | translate }}</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="bi bi-check-circle-fill text-primary text-xs mt-1"></i>
              <span>{{ 'cookies_policy.types_of_cookies.marketing.example3' | translate }}</span>
            </li>
          </ul>

          <p class="text-xs text-text-muted mt-3">
            {{ 'cookies_policy.types_of_cookies.marketing.note' | translate }}
          </p>
        </div>
      </div>

    </section>
  `
})
export class TypesOfCookiesSection {}
