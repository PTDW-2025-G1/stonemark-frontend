import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pp-rights',
  standalone: true,
  imports: [CommonModule, LegalSectionBlockComponent, TranslateModule],
  template: `
    <app-legal-section-block
      [title]="'privacy-policy.rights.title' | translate"
      [paragraphs]="['privacy-policy.rights.desc' | translate]"
      [hasInnerContent]="true"
    >
      <ul class="list-disc pl-5 space-y-2 text-text-muted mt-2">
        <li><span class="font-medium text-text">{{ 'privacy-policy.rights.access.title' | translate }}:</span> {{ 'privacy-policy.rights.access.desc' | translate }}</li>
        <li><span class="font-medium text-text">{{ 'privacy-policy.rights.rectification.title' | translate }}:</span> {{ 'privacy-policy.rights.rectification.desc' | translate }}</li>
        <li><span class="font-medium text-text">{{ 'privacy-policy.rights.erasure.title' | translate }}:</span> {{ 'privacy-policy.rights.erasure.desc' | translate }}</li>
        <li><span class="font-medium text-text">{{ 'privacy-policy.rights.restriction.title' | translate }}:</span> {{ 'privacy-policy.rights.restriction.desc' | translate }}</li>
        <li><span class="font-medium text-text">{{ 'privacy-policy.rights.objection.title' | translate }}:</span> {{ 'privacy-policy.rights.objection.desc' | translate }}</li>
        <li><span class="font-medium text-text">{{ 'privacy-policy.rights.portability.title' | translate }}:</span> {{ 'privacy-policy.rights.portability.desc' | translate }}</li>
      </ul>

      <p class="text-text-muted leading-relaxed mt-4">
        {{ 'privacy-policy.rights.exercise' | translate }}
      </p>
    </app-legal-section-block>
  `
})
export class PpRightsComponent {}
