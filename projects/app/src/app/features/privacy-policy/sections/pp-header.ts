import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pp-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="space-y-4">
      <p class="text-sm font-semibold tracking-wide text-primary uppercase">
        Privacy Policy
      </p>
      <h1 class="text-4xl sm:text-5xl font-semibold text-text">
        We protect your personal data
      </h1>
      <p class="text-lg text-text-muted">
        This Privacy Policy explains what data we collect, for what purposes, on what legal basis (GDPR), and for how long we retain it, as well as your rights as a data subject.
      </p>
    </header>

    <div class="grid gap-6 md:grid-cols-3">
      <div class="bg-surface-alt rounded-2xl border border-border p-6 space-y-2">
        <h2 class="text-lg font-semibold text-text">Data Collected</h2>
        <p class="text-sm text-text-muted">
          Account data, platform interactions, and submitted content (e.g., photos and respective metadata).
        </p>
      </div>
      <div class="bg-surface-alt rounded-2xl border border-border p-6 space-y-2">
        <h2 class="text-lg font-semibold text-text">Purposes</h2>
        <p class="text-sm text-text-muted">
          Account management, service provision, application improvement, and compliance with legal obligations.
        </p>
      </div>
      <div class="bg-surface-alt rounded-2xl border border-border p-6 space-y-2">
        <h2 class="text-lg font-semibold text-text">GDPR & Rights</h2>
        <p class="text-sm text-text-muted">
          Processing based on Article 6 of the GDPR. Ensures access, rectification, erasure, and other legal guarantees for data subjects.
        </p>
      </div>
    </div>
  `
})
export class PpHeaderComponent {}
