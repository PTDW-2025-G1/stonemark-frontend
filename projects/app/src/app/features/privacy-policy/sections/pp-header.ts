import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LegalHeroHeaderComponent} from '@shared/ui/legal-hero-header/legal-hero-header';

@Component({
  selector: 'app-pp-header',
  standalone: true,
  imports: [CommonModule, LegalHeroHeaderComponent],
  template: `
    <app-legal-hero-header
      title="Privacy Policy"
      lastUpdated="November 19, 2025"
    />

    <div class="grid gap-6 md:grid-cols-3">
      <div class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 class="text-lg font-semibold text-text">Data Collected</h2>
        <p class="text-sm text-text-muted">
          Account data, platform interactions, and submitted content (e.g., photos and respective metadata).
        </p>
      </div>
      <div class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 class="text-lg font-semibold text-text">Purposes</h2>
        <p class="text-sm text-text-muted">
          Account management, service provision, application improvement, and compliance with legal obligations.
        </p>
      </div>
      <div class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 class="text-lg font-semibold text-text">GDPR & Rights</h2>
        <p class="text-sm text-text-muted">
          Processing based on Article 6 of the GDPR. Ensures access, rectification, erasure, and other legal guarantees for data subjects.
        </p>
      </div>
    </div>
  `
})
export class PpHeaderComponent {}
