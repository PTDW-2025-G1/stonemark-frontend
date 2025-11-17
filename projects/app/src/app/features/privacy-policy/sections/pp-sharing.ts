import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pp-sharing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="space-y-4 bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 class="text-2xl font-semibold text-text">
        4. Sharing of personal data
      </h2>
      <p class="text-text-muted">
        We do not sell or commercialize your personal data. Data sharing is limited to the following cases:
      </p>
      <ul class="list-disc pl-5 space-y-2 text-text-muted">
        <li>Service providers strictly necessary for the technical operation of the platform, subject to confidentiality obligations.</li>
        <li>When required by law or by a competent authority, under European Union or Member State law.</li>
        <li>With your explicit consent, if applicable, for additional purposes clearly identified.</li>
      </ul>
    </section>
  `
})
export class PpSharingComponent {}
