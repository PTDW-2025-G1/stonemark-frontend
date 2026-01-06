import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface Faq {
  id: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section>
      <div class="text-center mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
          <i class="bi bi-question-circle text-primary"></i>
          <span class="text-sm font-semibold text-primary uppercase tracking-wider">FAQ</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text mb-4">
          {{ 'contact.faq.title' | translate }}
        </h2>
        <p class="text-lg text-text-muted max-w-2xl mx-auto">
          {{ 'contact.faq.subtitle' | translate }}
        </p>
      </div>

      <div class="max-w-4xl mx-auto space-y-4">
        @for (faq of faqs; track faq.id) {
          <div class="bg-gradient-to-br from-surface-alt to-surface rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300">
            <button
              (click)="toggleFAQ(faq.id)"
              class="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-start justify-between gap-4 text-left group"
            >
              <div class="flex-1">
                <h3 class="text-base sm:text-lg font-semibold text-text group-hover:text-primary transition-colors">
                  {{ 'contact.faq.questions.' + faq.id + '.q' | translate }}
                </h3>
              </div>
              <div class="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center transition-transform duration-300"
                   [class.rotate-180]="faq.isOpen">
                <i class="bi bi-chevron-down text-primary"></i>
              </div>
            </button>

            @if (faq.isOpen) {
              <div class="px-6 sm:px-8 pb-5 sm:pb-6">
                <p class="text-sm sm:text-base text-text-muted leading-relaxed border-t border-border pt-4">
                  {{ 'contact.faq.questions.' + faq.id + '.a' | translate }}
                </p>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `
})
export class FaqSectionComponent {
  faqs: Faq[] = [
    { id: 'what_is', isOpen: false },
    { id: 'who_can_participate', isOpen: false },
    { id: 'how_contribute', isOpen: false },
    { id: 'is_free', isOpen: false },
    { id: 'use_data', isOpen: false },
    { id: 'reliable', isOpen: false },
    { id: 'correct_info', isOpen: false },
    { id: 'institutions', isOpen: false },
    { id: 'location_accuracy', isOpen: false },
    { id: 'data_protection', isOpen: false }
  ];

  toggleFAQ(id: string) {
    this.faqs = this.faqs.map(faq =>
      faq.id === id ? { ...faq, isOpen: !faq.isOpen } : { ...faq, isOpen: false }
    );
  }
}
