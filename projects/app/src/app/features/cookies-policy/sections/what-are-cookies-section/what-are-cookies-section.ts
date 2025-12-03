import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-what-are-cookies-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div class="flex items-center gap-3 mb-4">
        <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">
          What Are Cookies?
        </h2>
      </div>

      <p class="text-text-muted leading-relaxed mb-4">
        Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
      </p>

      <p class="text-text-muted leading-relaxed">
        Cookies can be "session cookies" (temporary, deleted when you close your browser) or "persistent cookies" (remain on your device for a set period or until manually deleted).
      </p>
    </section>
  `
})
export class WhatAreCookiesSection {}
