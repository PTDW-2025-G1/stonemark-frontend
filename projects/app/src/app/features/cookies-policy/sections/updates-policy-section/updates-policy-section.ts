import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updates-policy-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div class="flex items-center gap-3 mb-4">
        <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">
          Updates to This Policy
        </h2>
      </div>

      <p class="text-text-muted leading-relaxed">
        We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices.
        We will notify you of any material changes by posting the updated policy on this page with a new "Last updated" date.
        We encourage you to review this policy periodically to stay informed about how we use cookies.
      </p>
    </section>
  `
})
export class UpdatesPolicySection {}
