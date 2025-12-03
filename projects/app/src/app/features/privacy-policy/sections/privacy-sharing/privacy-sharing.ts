import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LegalSectionBlockComponent} from '@shared/ui/legal-section-block/legal-section-block';

@Component({
  selector: 'app-pp-sharing',
  standalone: true,
  imports: [CommonModule, LegalSectionBlockComponent, LegalSectionBlockComponent],
  template: `
    <app-legal-section-block
      title="4. Sharing of personal data"
      [paragraphs]="[
        'We do not sell or commercialize your personal data. Data sharing is limited to the following cases:'
      ]"
      [hasInnerContent]="true"
    >
      <ul class="list-disc pl-5 space-y-2 text-text-muted mt-2">
        <li>Service providers strictly necessary for the technical operation of the platform, subject to confidentiality obligations.</li>
        <li>When required by law or by a competent authority, under European Union or Member State law.</li>
        <li>With your explicit consent, if applicable, for additional purposes clearly identified.</li>
      </ul>
    </app-legal-section-block>
  `
})
export class PpSharingComponent {}
