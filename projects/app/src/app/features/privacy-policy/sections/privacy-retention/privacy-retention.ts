import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LegalSectionBlockComponent} from '@shared/ui/legal-section-block/legal-section-block';

@Component({
  selector: 'app-pp-retention',
  standalone: true,
  imports: [CommonModule, LegalSectionBlockComponent],
  template: `
    <app-legal-section-block
      title="3. Data retention period"
      [paragraphs]="[
        'Personal data is retained only for the period necessary to fulfill the purposes for which it was collected, in accordance with the storage limitation principle (Article 5(1)(e) of the GDPR):'
      ]"
      [hasInnerContent]="true"
    >
      <ul class="list-disc pl-5 space-y-2 text-text-muted mt-2">
        <li>Account data: kept while the account is active or until a deletion request is made.</li>
        <li>Submitted content: kept as long as it is relevant for the use of the application or until a deletion request by the user.</li>
        <li>Technical and security logs: retained for shorter periods, strictly necessary for auditing and security.</li>
      </ul>
    </app-legal-section-block>
  `
})
export class PpRetentionComponent {}
