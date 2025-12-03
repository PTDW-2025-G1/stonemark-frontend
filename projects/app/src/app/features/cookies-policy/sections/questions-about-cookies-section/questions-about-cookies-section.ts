import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-questions-about-cookies-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-6 lg:p-8 shadow-lg">
      <div class="flex items-center gap-3 mb-4">
        <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">
          Questions About Cookies?
        </h2>
      </div>

      <p class="text-text-muted leading-relaxed mb-4">
        If you have questions about how we use cookies or would like more information about your privacy rights,
        please don't hesitate to contact us.
      </p>

      <div class="flex flex-wrap gap-4">
        <a
          routerLink="/contact"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
        >
          <i class="bi bi-chat-dots"></i>
          Contact Us
        </a>

        <a
          routerLink="/privacy-policy"
          class="inline-flex items-center gap-2 px-6 py-3 bg-surface border-2 border-border text-text rounded-xl font-semibold hover:border-primary transition-all"
        >
          <i class="bi bi-shield-check"></i>
          Privacy Policy
        </a>
      </div>
    </section>
  `
})
export class QuestionsAboutCookiesSection {}
