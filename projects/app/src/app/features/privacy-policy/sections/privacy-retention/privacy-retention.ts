import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pp-retention',
  standalone: true,
  imports: [CommonModule, LegalSectionBlockComponent, TranslateModule],
  template: `
    <app-legal-section-block
      [title]="'privacy-policy.retention.title' | translate"
      [paragraphs]="['privacy-policy.retention.desc' | translate]"
      [hasInnerContent]="true"
    >
      <ul class="list-disc pl-5 space-y-2 text-text-muted mt-2">
        <li>{{ 'privacy-policy.retention.account' | translate }}</li>
        <li>{{ 'privacy-policy.retention.content' | translate }}</li>
        <li>{{ 'privacy-policy.retention.logs' | translate }}</li>
      </ul>
    </app-legal-section-block>
  `
})
export class PpRetentionComponent {}
