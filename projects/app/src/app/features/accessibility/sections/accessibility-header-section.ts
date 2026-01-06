import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-accessibility-header-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="text-center mb-16">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-surface-alt rounded-full mb-6 border-2 border-border">
        <i class="bi bi-universal-access text-4xl text-primary"></i>
      </div>
      <h1 class="text-5xl font-serif font-bold text-text mb-4">
        {{ 'accessibility.header.title' | translate }}
      </h1>
      <p class="text-lg text-text-muted max-w-2xl mx-auto font-sans">
        {{ 'accessibility.header.desc' | translate }}
      </p>
    </div>
  `
})
export class AccessibilityHeaderSectionComponent {}

