import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pp-purposes',
  standalone: true,
  imports: [CommonModule, LegalSectionBlockComponent, TranslateModule],
  template: `
    <app-legal-section-block
      [title]="'privacy-policy.purposes.title' | translate"
      [paragraphs]="['privacy-policy.purposes.desc' | translate]"
      [hasInnerContent]="true"
    >
      <ul class="space-y-3 text-text-muted">

        <li>
          <span class="font-medium text-text">{{ 'privacy-policy.purposes.account.title' | translate }}:</span>
          {{ 'privacy-policy.purposes.account.desc' | translate }}
          <span class="italic">{{ 'privacy-policy.purposes.account.legal' | translate }}</span>
        </li>

        <li>
          <span class="font-medium text-text">{{ 'privacy-policy.purposes.management.title' | translate }}:</span>
          {{ 'privacy-policy.purposes.management.desc' | translate }}
          <span class="italic">{{ 'privacy-policy.purposes.management.legal' | translate }}</span>
        </li>

        <li>
          <span class="font-medium text-text">{{ 'privacy-policy.purposes.improvement.title' | translate }}:</span>
          {{ 'privacy-policy.purposes.improvement.desc' | translate }}
          <span class="italic">{{ 'privacy-policy.purposes.improvement.legal' | translate }}</span>
        </li>

        <li>
          <span class="font-medium text-text">{{ 'privacy-policy.purposes.compliance.title' | translate }}:</span>
          {{ 'privacy-policy.purposes.compliance.desc' | translate }}
          <span class="italic">{{ 'privacy-policy.purposes.compliance.legal' | translate }}</span>
        </li>

      </ul>
    </app-legal-section-block>
  `
})
export class PpPurposesComponent {}
