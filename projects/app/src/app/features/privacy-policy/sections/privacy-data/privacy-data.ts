import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pp-data',
  standalone: true,
  imports: [CommonModule, LegalSectionBlockComponent, TranslateModule],
  template: `
    <app-legal-section-block
      [title]="'privacy-policy.data.title' | translate"
      [paragraphs]="['privacy-policy.data.personal.desc' | translate]"
      [hasInnerContent]="true"
    >
      <ul class="list-disc pl-5 space-y-2 text-text-muted mt-2">
        <li>
          <span class="font-medium text-text">{{ 'privacy-policy.data.personal.title' | translate }}:</span>
          {{ 'privacy-policy.data.personal.items' | translate }}
        </li>

        <li>
          <span class="font-medium text-text">{{ 'privacy-policy.data.content.title' | translate }}:</span>
          {{ 'privacy-policy.data.content.items' | translate }}
        </li>

        <li>
          <span class="font-medium text-text">{{ 'privacy-policy.data.technical.title' | translate }}:</span>
          {{ 'privacy-policy.data.technical.items' | translate }}
        </li>
      </ul>
    </app-legal-section-block>
  `
})
export class PpDataComponent {}


