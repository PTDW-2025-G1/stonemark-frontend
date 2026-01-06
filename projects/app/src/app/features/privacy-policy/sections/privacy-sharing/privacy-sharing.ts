import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pp-sharing',
  standalone: true,
  imports: [CommonModule, LegalSectionBlockComponent, TranslateModule],
  template: `
    <app-legal-section-block
      [title]="'privacy-policy.sharing.title' | translate"
      [paragraphs]="['privacy-policy.sharing.desc' | translate]"
      [hasInnerContent]="true"
    >
      <ul class="list-disc pl-5 space-y-2 text-text-muted mt-2">
        <li>{{ 'privacy-policy.sharing.providers' | translate }}</li>
        <li>{{ 'privacy-policy.sharing.legal' | translate }}</li>
        <li>{{ 'privacy-policy.sharing.consent' | translate }}</li>
      </ul>
    </app-legal-section-block>
  `
})
export class PpSharingComponent {}
