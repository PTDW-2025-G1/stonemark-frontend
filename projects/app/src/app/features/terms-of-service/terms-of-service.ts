import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [CommonModule],
  template: '<section class="py-16 px-4">\n' +
    '  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-8 space-y-12">\n' +
    '    <!-- Hero Header -->\n' +
    '    <header class="flex flex-col gap-2">\n' +
    '      <p class="text-xs font-semibold tracking-widest uppercase text-primary">\n' +
    '        Stonemark Legal\n' +
    '      </p>\n' +
    '      <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight">\n' +
    '        Terms of Service\n' +
    '      </h1>\n' +
    '      <p class="text-base text-text-muted">\n' +
    '        Last updated: November 17, 2025\n' +
    '      </p>\n' +
    '    </header>\n' +
    '\n' +
    '    <!-- Sections Grid -->\n' +
    '    <article class="flex flex-col gap-6" aria-label="Terms of Service sections">\n' +
    '      <!-- Platform Objective -->\n' +
    '      <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">\n' +
    '        <div class="flex items-center gap-3 mb-4">\n' +
    '          <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">\n' +
    '            Platform Objective\n' +
    '          </h2>\n' +
    '        </div>\n' +
    '        <p class="text-text-muted leading-relaxed">\n' +
    '          Stonemark is a platform designed to help users discover, document and share information about historical\n' +
    '          and cultural landmarks. Our goal is to make heritage data more accessible, encourage responsible exploration,\n' +
    '          and support community contributions that enrich public knowledge.\n' +
    '        </p>\n' +
    '      </section>\n' +
    '\n' +
    '      <!-- Rules of Use -->\n' +
    '      <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">\n' +
    '        <div class="flex items-center gap-3 mb-4">\n' +
    '          <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">\n' +
    '            Rules of Use\n' +
    '          </h2>\n' +
    '        </div>\n' +
    '        <ul class="flex flex-col gap-3 text-text-muted leading-relaxed pl-5 list-disc marker:text-primary">\n' +
    '          <li>Use the platform lawfully and respectfully toward other users and local communities.</li>\n' +
    '          <li>Do not upload or share content that is illegal, defamatory, obscene, or infringes third-party rights.</li>\n' +
    '          <li>Provide accurate, honest information when submitting records, and clearly mark opinions or uncertain details.</li>\n' +
    '          <li>Do not attempt to harm, scrape, or otherwise interfere with the platform\'s operation or security.</li>\n' +
    '          <li>Follow any site-specific instructions for contributing photographs, location data, or metadata.</li>\n' +
    '        </ul>\n' +
    '      </section>\n' +
    '\n' +
    '      <!-- User Responsibilities -->\n' +
    '      <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">\n' +
    '        <div class="flex items-center gap-3 mb-4">\n' +
    '          <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">\n' +
    '            User Responsibilities\n' +
    '          </h2>\n' +
    '        </div>\n' +
    '        <p class="text-text-muted leading-relaxed mb-4">\n' +
    '          Users are responsible for their own actions and the content they submit. This includes:\n' +
    '        </p>\n' +
    '        <ul class="flex flex-col gap-3 text-text-muted leading-relaxed pl-5 list-disc marker:text-primary">\n' +
    '          <li>Ensuring any content you contribute is accurate, lawful and does not violate privacy or intellectual property rights.</li>\n' +
    '          <li>Keeping your account credentials secure and notifying us promptly of any unauthorized access.</li>\n' +
    '          <li>Respecting site guidance about sensitive locations, private property, or restricted areas.</li>\n' +
    '        </ul>\n' +
    '      </section>\n' +
    '\n' +
    '      <!-- Platform Responsibilities -->\n' +
    '      <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">\n' +
    '        <div class="flex items-center gap-3 mb-4">\n' +
    '          <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">\n' +
    '            Platform Responsibilities\n' +
    '          </h2>\n' +
    '        </div>\n' +
    '        <p class="text-text-muted leading-relaxed mb-4">\n' +
    '          Stonemark strives to maintain a reliable and useful service. Our responsibilities include:\n' +
    '        </p>\n' +
    '        <ul class="flex flex-col gap-3 text-text-muted leading-relaxed pl-5 list-disc marker:text-primary">\n' +
    '          <li>Maintaining the availability and security of the platform within reasonable operational limits.</li>\n' +
    '          <li>Reviewing and acting on reports of unlawful or policy-violating content, including removal when necessary.</li>\n' +
    '          <li>Protecting user privacy in accordance with our Privacy Policy.</li>\n' +
    '        </ul>\n' +
    '      </section>\n' +
    '\n' +
    '      <!-- Reporting and Enforcement -->\n' +
    '      <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">\n' +
    '        <div class="flex items-center gap-3 mb-4">\n' +
    '          <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">\n' +
    '            Reporting and Enforcement\n' +
    '          </h2>\n' +
    '        </div>\n' +
    '        <p class="text-text-muted leading-relaxed">\n' +
    '          If you see content that violates rules or is otherwise concerning, please report it using the platform\'s\n' +
    '          reporting tools or contact support. We may remove or restrict content and suspend accounts that breach these Terms.\n' +
    '        </p>\n' +
    '      </section>\n' +
    '\n' +
    '      <!-- Limitations and Disclaimers -->\n' +
    '      <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">\n' +
    '        <div class="flex items-center gap-3 mb-4">\n' +
    '          <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">\n' +
    '            Limitations and Disclaimers\n' +
    '          </h2>\n' +
    '        </div>\n' +
    '        <p class="text-text-muted leading-relaxed">\n' +
    '          The platform provides user-contributed information which may be incomplete or inaccurate. Stonemark does not\n' +
    '          guarantee the completeness or accuracy of contributed data and is not responsible for decisions you make based\n' +
    '          on it. Use your judgment and verify important details independently.\n' +
    '        </p>\n' +
    '      </section>\n' +
    '\n' +
    '      <!-- Contact -->\n' +
    '      <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">\n' +
    '        <div class="flex items-center gap-3 mb-4">\n' +
    '          <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">\n' +
    '            Contact\n' +
    '          </h2>\n' +
    '        </div>\n' +
    '        <p class="text-text-muted leading-relaxed">\n' +
    '          For questions about these Terms, reports or appeals, please visit\n' +
    '          <a class="text-info font-semibold underline decoration-2 decoration-info/60 hover:text-primary hover:decoration-primary/60 transition-colors"\n' +
    '             href="/contact">our contact page</a>\n' +
    '          or consult the Privacy Policy for data-related concerns.\n' +
    '        </p>\n' +
    '      </section>\n' +
    '    </article>\n' +
    '  </div>\n' +
    '</section>\n',
})
export class TermsOfServiceComponent {}
