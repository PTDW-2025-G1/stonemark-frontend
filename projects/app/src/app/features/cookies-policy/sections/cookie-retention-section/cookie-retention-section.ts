import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-retention-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">

      <div class="flex items-center gap-3 mb-4">
        <h2 class="font-serif text-2xl lg:text-3xl font-medium text-text">
          Cookie Retention Periods
        </h2>
      </div>

      <p class="text-text-muted leading-relaxed mb-4">
        Different cookies are retained for different periods:
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div class="bg-surface rounded-xl p-4 border border-border">
          <h4 class="font-bold text-text mb-2">Session Cookies</h4>
          <p class="text-sm text-text-muted">Deleted when you close your browser</p>
        </div>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <h4 class="font-bold text-text mb-2">Persistent Cookies</h4>
          <p class="text-sm text-text-muted">Remain for 30 days to 2 years depending on type</p>
        </div>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <h4 class="font-bold text-text mb-2">Authentication Cookies</h4>
          <p class="text-sm text-text-muted">Retained for up to 30 days or until logout</p>
        </div>

        <div class="bg-surface rounded-xl p-4 border border-border">
          <h4 class="font-bold text-text mb-2">Analytics Cookies</h4>
          <p class="text-sm text-text-muted">Typically retained for 24 months</p>
        </div>

      </div>

    </section>
  `
})
export class CookieRetentionSection {}
