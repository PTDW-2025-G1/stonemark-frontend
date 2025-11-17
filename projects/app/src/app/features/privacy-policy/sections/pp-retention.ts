import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pp-retention',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="space-y-4 bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 class="text-2xl font-semibold text-text">
        3. Data retention period
      </h2>
      <p class="text-text-muted">
        Personal data is retained only for the period necessary to fulfill the purposes for which it was collected, in accordance with the storage limitation principle (Article 5(1)(e) of the GDPR):
      </p>
      <ul class="list-disc pl-5 space-y-2 text-text-muted">
        <li>Account data: kept while the account is active or until a deletion request is made.</li>
        <li>Submitted content: kept as long as it is relevant for the use of the application or until a deletion request by the user.</li>
        <li>Technical and security logs: retained for shorter periods, strictly necessary for auditing and security.</li>
      </ul>
    </section>
  `
})
export class PpRetentionComponent {}
