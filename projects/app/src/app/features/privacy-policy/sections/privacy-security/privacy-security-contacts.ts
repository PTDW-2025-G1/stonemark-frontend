import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalSectionBlockComponent } from '@shared/ui/legal-section-block/legal-section-block';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pp-security-contacts',
  standalone: true,
  imports: [CommonModule, LegalSectionBlockComponent, TranslateModule],
  template: `
    <app-legal-section-block
      [title]="'privacy-policy.security.title' | translate"
      [paragraphs]="[
        'privacy-policy.security.desc1' | translate,
        'privacy-policy.security.desc2' | translate
      ]"
    />
  `
})
export class PpSecurityContactsComponent {}
