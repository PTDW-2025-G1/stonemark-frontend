import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface LegalInfoItem {
  title: string;
  text: string;
}

@Component({
  selector: 'app-legal-info-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid gap-6 md:grid-cols-3">
      @for (item of items; track $index) {
        <div class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 class="text-lg font-semibold text-text">
            {{ item.title }}
          </h2>

          <p class="text-sm text-text-muted">
            {{ item.text }}
          </p>
        </div>
      }
    </div>
  `
})
export class LegalInfoGridComponent {
  @Input() items: LegalInfoItem[] = [];
}
