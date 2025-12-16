import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-managing-cookie-preferences-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">

      <div class="flex items-center gap-3 mb-4">
        <i class="bi bi-sliders text-primary text-2xl"></i>
        <h2 class="font-serif text-2xl lg:text-3xl font-medium text-text">
          Managing Your Cookie Preferences
        </h2>
      </div>

      <p class="text-text-muted leading-relaxed mb-4">
        You have the right to control which cookies are set on your device. You can manage your preferences in several ways:
      </p>

      <div class="space-y-4">

        <!-- Browser Settings -->
        <div class="bg-surface rounded-xl p-5 border border-border">
          <h4 class="font-bold text-text mb-3 flex items-center gap-2">
            <i class="bi bi-browser-chrome text-primary"></i>
            Browser Settings
          </h4>

          <p class="text-sm text-text-muted mb-3">
            Most browsers allow you to control cookies through their settings. You can typically:
          </p>

          <ul class="text-sm text-text-muted space-y-2 pl-4">
            <li class="flex items-start gap-2">
              <span class="text-primary">•</span>
              <span>View cookies stored on your device</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">•</span>
              <span>Delete existing cookies</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">•</span>
              <span>Block all cookies or specific types</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">•</span>
              <span>Set preferences for specific websites</span>
            </li>
          </ul>
        </div>

        <!-- Cookie Banner -->
        <div class="bg-surface rounded-xl p-5 border border-border">
          <h4 class="font-bold text-text mb-3 flex items-center gap-2">
            <i class="bi bi-toggles text-primary"></i>
            Cookie Consent Banner
          </h4>
          <p class="text-sm text-text-muted">
            When you first visit Stonemark, you'll see a cookie consent banner. You can accept all cookies, reject non-essential cookies, or customize your preferences. You can change these settings at any time through the cookie preferences link in the footer.
          </p>
        </div>

        <!-- Opt-Out Links -->
        <div class="bg-surface rounded-xl p-5 border border-border">
          <h4 class="font-bold text-text mb-3 flex items-center gap-2">
            <i class="bi bi-box-arrow-right text-primary"></i>
            Third-Party Opt-Out
          </h4>

          <p class="text-sm text-text-muted mb-2">
            For third-party analytics and advertising cookies, you can opt out through:
          </p>

          <ul class="text-sm space-y-1">
            <li>
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener"
                 class="text-primary font-semibold hover:underline">
                Google Analytics Opt-Out
              </a>
            </li>
            <li>
              <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener"
                 class="text-primary font-semibold hover:underline">
                Your Online Choices (EU)
              </a>
            </li>
            <li>
              <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener"
                 class="text-primary font-semibold hover:underline">
                Network Advertising Initiative
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div class="mt-6 p-4 bg-warning/10 border border-warning/30 rounded-xl">
        <p class="text-sm text-text-muted">
          <strong class="text-primary">Important:</strong> Blocking certain cookies may affect your experience on Stonemark. Some features may not work properly or may be unavailable if you disable essential or functional cookies.
        </p>
      </div>

    </section>
  `
})
export class ManagingCookiePreferencesSection {}
