import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-hero-section',
  standalone: true,
  template: `
    <section class="relative text-primary overflow-hidden">
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <i class="bi bi-envelope"></i>
            <span class="text-sm font-medium">Get in Touch</span>
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6">
            We'd Love to Hear From You
          </h1>
          <p class="text-lg sm:text-xl text-primary leading-relaxed">
            Have questions about Stone Mark? Want to collaborate or report an issue?
            We're here to help preserve history together.
          </p>
        </div>
      </div>
    </section>
  `
})
export class ContactHeroSectionComponent {}
