import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LegalSectionBlockComponent} from '@shared/ui/legal-section-block/legal-section-block';

@Component({
  selector: 'app-pp-rights',
  standalone: true,
  imports: [CommonModule, LegalSectionBlockComponent],
  template: `
    <app-legal-section-block
      title="5. Data subject rights"
      [paragraphs]="[
        'Under Articles 12 to 22 of the GDPR, users have, among others, the following rights:'
      ]"
      [hasInnerContent]="true"
    >
      <ul class="list-disc pl-5 space-y-2 text-text-muted mt-2">
        <li><span class="font-medium text-text">Right of access:</span> to obtain confirmation as to whether your data is being processed and to access that information.</li>
        <li><span class="font-medium text-text">Right to rectification:</span> to request the correction of inaccurate or incomplete data.</li>
        <li><span class="font-medium text-text">Right to erasure:</span> to request the deletion of data when legal requirements are met.</li>
        <li><span class="font-medium text-text">Right to restriction of processing:</span> to request the temporary suspension of certain processing operations.</li>
        <li><span class="font-medium text-text">Right to object:</span> to object to processing based on legitimate interest, for reasons related to your particular situation.</li>
        <li><span class="font-medium text-text">Right to data portability:</span> to receive the data you have provided to us in a structured format, or request its transmission to another controller.</li>
      </ul>

      <p class="text-text-muted leading-relaxed mt-4">
        To exercise any of these rights, you may contact us through the means indicated in the following section.
      </p>
    </app-legal-section-block>
  `
})
export class PpRightsComponent {}
