import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LegalSectionBlockComponent} from '@shared/ui/legal-section-block/legal-section-block';

@Component({
  selector: 'app-pp-purposes',
  standalone: true,
  imports: [CommonModule, LegalSectionBlockComponent, LegalSectionBlockComponent],
  template: `
    <app-legal-section-block
      title="2. Purposes of processing and legal basis (GDPR)"
      [paragraphs]="[
        'Personal data is processed for specific, explicit, and legitimate purposes, in accordance with Article 5 of the GDPR. In particular:'
      ]"
      [hasInnerContent]="true"
    >
      <ul class="space-y-3 text-text-muted">

        <li>
          <span class="font-medium text-text">Account management and authentication:</span>
          to allow registration, login, and continuous use of the application.
          <span class="italic">(Legal basis: Article 6(1)(b) – performance of a contract.)</span>
        </li>

        <li>
          <span class="font-medium text-text">Management of submitted content:</span>
          to receive, store, and display photos and associated information, as well as manage the submission history.
          <span class="italic">(Legal basis: Article 6(1)(b) – performance of a contract.)</span>
        </li>

        <li>
          <span class="font-medium text-text">Platform improvement and security:</span>
          to monitor performance, prevent abuse, and improve features.
          <span class="italic">(Legal basis: Article 6(1)(f) – legitimate interest.)</span>
        </li>

        <li>
          <span class="font-medium text-text">Compliance with legal obligations:</span>
          to respond to requests from competent authorities or comply with applicable legal requirements.
          <span class="italic">(Legal basis: Article 6(1)(c) – compliance with a legal obligation.)</span>
        </li>

      </ul>
    </app-legal-section-block>
  `
})
export class PpPurposesComponent {}
