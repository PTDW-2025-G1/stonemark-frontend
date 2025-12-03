import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-legal-section-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">

      <!-- Title -->
      <div class="flex items-center gap-3 mb-4">
        <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">
          {{ title }}
        </h2>
      </div>

      <!-- Paragraphs -->
      @if (paragraphs.length > 0) {
        @for (p of paragraphs; let i = $index; track i) {
          <p class="text-text-muted leading-relaxed"
             [class.mb-4]="i !== paragraphs.length - 1">
            {{ p }}
          </p>
        }
      }

      <!-- Inner projected content -->
      @if (hasInnerContent) {
        <ng-content></ng-content>
      }

    </section>
  `
})
export class LegalSectionBlockComponent {
  @Input() title!: string;
  @Input() paragraphs: string[] = [];
  @Input() hasInnerContent = false;
}
