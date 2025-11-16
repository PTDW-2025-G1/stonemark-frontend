import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pp-security-contacts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="space-y-4 bg-surface rounded-2xl border border-border p-8">
      <h2 class="text-2xl font-semibold text-text">
        6. Data security and contacts
      </h2>
      <p class="text-text-muted">
        We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, destruction, or improper alteration.
      </p>
      <p class="text-text-muted">
        As this is an academic project, any additional questions about privacy or requests regarding your data can be addressed to the team responsible for the application.
      </p>
      <p class="text-sm text-text-muted">
        Last updated: {{ today | date:'dd/MM/yyyy' }}
      </p>
    </section>
  `
})
export class PpSecurityContactsComponent {
  today = new Date();
}
