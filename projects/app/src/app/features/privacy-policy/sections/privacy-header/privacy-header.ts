import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LegalHeroHeaderComponent} from '@shared/ui/legal-hero-header/legal-hero-header';
import {LegalInfoGridComponent} from '@shared/ui/legal-info-grid/legal-info-grid';

@Component({
  selector: 'app-pp-header',
  standalone: true,
  imports: [CommonModule, LegalHeroHeaderComponent, LegalInfoGridComponent],
  template: `
    <app-legal-hero-header
      title="Privacy Policy"
      lastUpdated="November 19, 2025"
    />

    <app-legal-info-grid
      [items]="[
    {
      title: 'Data Collected',
      text: 'Account data, platform interactions, and submitted content (e.g., photos and respective metadata).'
    },
    {
      title: 'Purposes',
      text: 'Account management, service provision, application improvement, and compliance with legal obligations.'
    },
    {
      title: 'GDPR & Rights',
      text: 'Processing based on Article 6 of the GDPR. Ensures access, rectification, erasure, and other legal guarantees for data subjects.'
    }
  ]"
    />
  `
})
export class PpHeaderComponent {}
