import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-introduction-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="bg-surface-alt border border-border rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div class="flex items-center gap-3 mb-4">
        <h2 class="font-serif text-2xl lg:text-3xl font-bold text-text">
          Introduction
        </h2>
      </div>

      <p class="text-text-muted leading-relaxed mb-4">
        This Cookie Policy explains how Stonemark ("we", "us", or "our") uses cookies and similar tracking technologies when you visit our website and use our services. This policy should be read alongside our Privacy Policy and Terms of Service.
      </p>

      <p class="text-text-muted leading-relaxed">
        By using Stonemark, you consent to the use of cookies in accordance with this policy. If you do not agree to our use of cookies, you should adjust your browser settings accordingly or refrain from using our platform.
      </p>
    </section>
  `
})
export class CookieIntroductionSection {}
