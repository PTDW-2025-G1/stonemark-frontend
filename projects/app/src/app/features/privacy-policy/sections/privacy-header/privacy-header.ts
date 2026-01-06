import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalHeroHeaderComponent } from '@shared/ui/legal-hero-header/legal-hero-header';
import { LegalInfoGridComponent } from '@shared/ui/legal-info-grid/legal-info-grid';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pp-header',
  standalone: true,
  imports: [CommonModule, LegalHeroHeaderComponent, LegalInfoGridComponent, TranslateModule],
  template: `
    <app-legal-hero-header
      [title]="'privacy-policy.header.title' | translate"
      [lastUpdated]="'shared-links.last_updated' | translate"
    />

    <app-legal-info-grid
      [items]="[
        {
          title: 'privacy-policy.info.data.title' | translate,
          text: 'privacy-policy.info.data.text' | translate
        },
        {
          title: 'privacy-policy.info.purposes.title' | translate,
          text: 'privacy-policy.info.purposes.text' | translate
        },
        {
          title: 'privacy-policy.info.gdpr.title' | translate,
          text: 'privacy-policy.info.gdpr.text' | translate
        }
      ]"
    />
  `
})
export class PpHeaderComponent {}


