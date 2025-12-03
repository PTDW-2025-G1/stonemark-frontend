import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LegalSectionBlockComponent} from '@shared/ui/legal-section-block/legal-section-block';

@Component({
  selector: 'app-terms-section-grid',
  standalone: true,
  imports: [CommonModule, LegalSectionBlockComponent],
  template: `
    <article class="flex flex-col gap-6" aria-label="Terms of Service sections">

      <!-- Platform Objective -->
      <app-legal-section-block
        title="Platform Objective"
        [paragraphs]="[
          'Stonemark is a platform designed to help users discover, document and share information about historical and cultural landmarks. Our goal is to make heritage data more accessible, encourage responsible exploration, and support community contributions that enrich public knowledge.'
        ]"
      />

      <!-- Rules of Use -->
      <app-legal-section-block
        title="Rules of Use"
        [hasInnerContent]="true"
      >
        <ul class="flex flex-col gap-3 text-text-muted leading-relaxed pl-5 list-disc marker:text-primary">
          <li>Use the platform lawfully and respectfully toward other users and local communities.</li>
          <li>Do not upload or share content that is illegal, defamatory, obscene, or infringes third-party rights.</li>
          <li>Provide accurate, honest information when submitting records, and clearly mark opinions or uncertain details.</li>
          <li>Do not attempt to harm, scrape, or otherwise interfere with the platform's operation or security.</li>
          <li>Follow any site-specific instructions for contributing photographs, location data, or metadata.</li>
        </ul>
      </app-legal-section-block>

      <!-- User Responsibilities -->
      <app-legal-section-block
        title="User Responsibilities"
        [paragraphs]="[
          'Users are responsible for their own actions and the content they submit. This includes:'
        ]"
        [hasInnerContent]="true"
      >
        <ul class="flex flex-col gap-3 text-text-muted leading-relaxed pl-5 list-disc marker:text-primary">
          <li>Ensuring any content you contribute is accurate, lawful and does not violate privacy or intellectual property rights.</li>
          <li>Keeping your account credentials secure and notifying us promptly of any unauthorized access.</li>
          <li>Respecting site guidance about sensitive locations, private property, or restricted areas.</li>
        </ul>
      </app-legal-section-block>

      <!-- Platform Responsibilities -->
      <app-legal-section-block
        title="Platform Responsibilities"
        [paragraphs]="[
          'Stonemark strives to maintain a reliable and useful service. Our responsibilities include:'
        ]"
        [hasInnerContent]="true"
      >
        <ul class="flex flex-col gap-3 text-text-muted leading-relaxed pl-5 list-disc marker:text-primary">
          <li>Maintaining the availability and security of the platform within reasonable operational limits.</li>
          <li>Reviewing and acting on reports of unlawful or policy-violating content, including removal when necessary.</li>
          <li>Protecting user privacy in accordance with our Privacy Policy.</li>
        </ul>
      </app-legal-section-block>

      <!-- Reporting and Enforcement -->
      <app-legal-section-block
        title="Reporting and Enforcement"
        [paragraphs]="[
          'If you see content that violates rules or is otherwise concerning, please report it using the platform’s reporting tools or contact support. We may remove or restrict content and suspend accounts that breach these Terms.'
        ]"
      />

      <!-- Limitations and Disclaimers -->
      <app-legal-section-block
        title="Limitations and Disclaimers"
        [paragraphs]="[
          'The platform provides user-contributed information which may be incomplete or inaccurate. Stonemark does not guarantee the completeness or accuracy of contributed data and is not responsible for decisions you make based on it. Use your judgment and verify important details independently.'
        ]"
      />

      <!-- Contact -->
      <app-legal-section-block
        title="Contact"
        [hasInnerContent]="true"
      >
        <p class="text-text-muted leading-relaxed">
          For questions about these Terms, reports or appeals, please visit
          <a
            class="text-info font-semibold underline decoration-2 decoration-info/60 hover:text-primary hover:decoration-primary/60 transition-colors"
            href="/contact">our contact page</a>
          or consult the Privacy Policy for data-related concerns.
        </p>
      </app-legal-section-block>

    </article>
  `
})
export class TermsSectionGrid {}
