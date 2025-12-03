import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-hero-section',
  standalone: true,
  imports: [CommonModule],
  template: `
        <!-- Hero Header -->
        <header class="flex flex-col gap-2 mb-10">
          <p class="text-xs font-semibold tracking-widest uppercase text-primary">
            Stonemark Legal
          </p>
          <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight">
            Cookie Policy
          </h1>
          <p class="text-base text-text-muted">
            Last updated: November 19, 2025
          </p>
        </header>`
})
export class CookieHeroSection {}
