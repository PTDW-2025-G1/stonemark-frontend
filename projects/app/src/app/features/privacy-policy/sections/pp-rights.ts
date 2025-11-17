import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pp-rights',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="space-y-4 bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 class="text-2xl font-semibold text-text">
        5. Data subject rights
      </h2>
      <p class="text-text-muted">
        Under Articles 12 to 22 of the GDPR, users have, among others, the following rights:
      </p>
      <ul class="list-disc pl-5 space-y-2 text-text-muted">
        <li><span class="font-medium text-text">Right of access:</span> to obtain confirmation as to whether your data is being processed and to access that information.</li>
        <li><span class="font-medium text-text">Right to rectification:</span> to request the correction of inaccurate or incomplete data.</li>
        <li><span class="font-medium text-text">Right to erasure:</span> to request the deletion of data when legal requirements are met.</li>
        <li><span class="font-medium text-text">Right to restriction of processing:</span> to request the temporary suspension of certain processing operations.</li>
        <li><span class="font-medium text-text">Right to object:</span> to object to processing based on legitimate interest, for reasons related to your particular situation.</li>
        <li><span class="font-medium text-text">Right to data portability:</span> to receive the data you have provided to us in a structured format, or request its transmission to another controller.</li>
      </ul>
      <p class="text-text-muted">
        To exercise any of these rights, you may contact us through the means indicated in the following section.
      </p>
    </section>
  `
})
export class PpRightsComponent {}
