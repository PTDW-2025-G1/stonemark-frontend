import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Faq {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <div class="text-center mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
          <i class="bi bi-question-circle text-primary"></i>
          <span class="text-sm font-semibold text-primary uppercase tracking-wider">FAQ</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text mb-4">
          Frequently Asked Questions
        </h2>
        <p class="text-lg text-text-muted max-w-2xl mx-auto">
          Find quick answers to common questions about Stone Mark
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
                  {{ faq.question }}
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
                  {{ faq.answer }}
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
    {
      id: 1,
      question: 'What is Stone Mark?',
      answer: 'Stone Mark is a collaborative web platform dedicated to the documentation, study, and preservation of stonemason marks — the distinctive symbols carved by medieval craftsmen on monuments, churches, and historic buildings. The project merges cultural heritage with modern geospatial technology to make these marks accessible worldwide.',
      isOpen: false
    },
    {
      id: 2,
      question: 'Who can participate?',
      answer: 'Anyone interested in cultural heritage can contribute! Whether you are a researcher, student, or curious explorer, you can upload photos of marks, add monument details, or help validate existing records. Community participation is at the heart of Stone Mark.',
      isOpen: false
    },
    {
      id: 3,
      question: 'How can I contribute to the project?',
      answer: 'You can contribute by photographing and submitting new stonemason marks, sharing information about monuments or helping verify existing data. Simply create an account, log in, and start exploring the database.',
      isOpen: false
    },
    {
      id: 4,
      question: 'Is Stone Mark free to use?',
      answer: 'Yes. Stone Mark is completely free and open to everyone. Our mission is to promote open access to historical knowledge and engage the public in the documentation of cultural heritage.',
      isOpen: false
    },
    {
      id: 5,
      question: 'Can I use Stone Mark for academic or research purposes?',
      answer: 'Absolutely. Stone Mark supports historians, archaeologists, and students in their research. All monuments, marks are documented with metadata that can be cited in academic work. If you need specific datasets or collaboration opportunities, please contact our team.',
      isOpen: false
    },
    {
      id: 6,
      question: 'How reliable is the information?',
      answer: 'All submitted data goes through a validation process involving both automated checks and manual review by our moderation team and partner institutions. However, as this is a collaborative project, users are encouraged to report any inaccuracies they find.',
      isOpen: false
    },
    {
      id: 7,
      question: 'How can I correct or update existing information?',
      answer: 'If you notice inaccurate or incomplete information on a monument, mark, or guild page, you can click the "Edit" button to submit corrections directly through an editable form. Your changes will be reviewed and validated by our moderation team before being published to ensure data accuracy and integrity.',
      isOpen: false
    },
    {
      id: 8,
      question: 'Can institutions collaborate with Stone Mark?',
      answer: 'Yes. We actively collaborate with museums, universities, heritage associations, and cultural organizations. Partnerships help expand the database, improve accuracy, and promote preservation initiatives. If your institution is interested, please contact us.',
      isOpen: false
    },
    {
      id: 9,
      question: 'How accurate is the location data?',
      answer: 'All locations are georeferenced with care using GPS data, official records, and community validation. We continuously update coordinates to ensure precision. If you detect a mismatch in the location of a monument or mark, you can easily report it.',
      isOpen: false
    },
    {
      id: 10,
      question: 'How is my personal data protected?',
      answer: 'We value your privacy. All user information is encrypted and stored securely. We comply with GDPR and all relevant data protection regulations. Contributions are publicly attributed to your username, but no private information is shared unless you choose to make it visible.',
      isOpen: false
    }
  ];

  toggleFAQ(id: number) {
    this.faqs = this.faqs.map(faq =>
      faq.id === id ? { ...faq, isOpen: !faq.isOpen } : { ...faq, isOpen: false }
    );
  }
}
