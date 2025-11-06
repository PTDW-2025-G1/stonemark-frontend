import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <section class="relative min-h-screen bg-surface overflow-hidden">

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
        <div class="text-center mb-12 sm:mb-16 lg:mb-20">

          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20 mb-6 sm:mb-8 animate-fade-in">
            <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-text">Preserving Heritage Through Technology</span>
          </div>

          <!-- Main Headline -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-text leading-tight mb-6 sm:mb-8 animate-slide-up">
            Discover the Stories
            <span class="block mt-2 bg-gradient-to-r from-primary via-info to-primary bg-clip-text text-transparent animate-gradient">
              Behind Every Stone
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="text-lg sm:text-xl lg:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 animate-fade-in-delay">
            Document and explore stonemason marks across centuries. Join a global community preserving architectural heritage, one symbol at a time.
          </p>

          <!-- Stats Row -->
          <div class="flex justify-center gap-8 sm:gap-12 lg:gap-16 mb-10 sm:mb-12 animate-fade-in-delay-2">
            <div class="text-center">
              <div class="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-1">2.5K+</div>
              <div class="text-sm sm:text-base text-text-muted">Monuments</div>
            </div>
            <div class="text-center">
              <div class="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-1">12K+</div>
              <div class="text-sm sm:text-base text-text-muted">Marks</div>
            </div>
            <div class="text-center">
              <div class="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-1">850+</div>
              <div class="text-sm sm:text-base text-text-muted">Contributors</div>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16 sm:mb-20 animate-fade-in-delay-3">
            <a routerLink="/monuments"
               class="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg overflow-hidden hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105">
              <div class="absolute inset-0 bg-gradient-to-r from-primary/80 to-info/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span class="relative flex items-center justify-center gap-2">
                Explore Now
                <i class="bi bi-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </span>
            </a>

            <a routerLink="/about"
               class="group px-8 py-4 bg-surface-alt border-2 border-border text-text rounded-xl font-semibold text-lg hover:border-primary hover:bg-surface transition-all duration-300">
              <span class="flex items-center justify-center gap-2">
                Learn More
                <i class="bi bi-info-circle"></i>
              </span>
            </a>
          </div>

        </div>

        <!-- Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">

          <!-- Monuments Card -->
          <a routerLink="/monuments"
             class="group relative bg-gradient-to-br from-surface-alt to-surface rounded-3xl p-8 sm:p-10 border-2 border-border hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 animate-fade-in-delay-4">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-info/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative space-y-6">
              <div class="w-20 h-20 bg-gradient-to-br from-primary to-info rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                <i class="bi bi-building text-white text-3xl"></i>
              </div>
              <div class="text-center">
                <h3 class="text-2xl font-serif font-bold text-text mb-2 group-hover:text-primary transition-colors">Monuments</h3>
                <p class="text-sm text-text-muted mb-4">Explore historic buildings and architectural wonders</p>
                <div class="flex items-center justify-center gap-2 text-sm text-primary font-medium">
                  <span>2,547 Sites</span>
                  <i class="bi bi-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </div>
              </div>
            </div>
          </a>

          <!-- Capture Card -->
          <a routerLink="/capture"
             class="group relative bg-gradient-to-br from-surface-alt to-surface rounded-3xl p-8 sm:p-10 border-2 border-border hover:border-info hover:shadow-2xl hover:shadow-info/10 transition-all duration-500 hover:-translate-y-2 animate-fade-in-delay-5">
            <div class="absolute inset-0 bg-gradient-to-br from-info/5 to-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative space-y-6">
              <div class="w-20 h-20 bg-gradient-to-br from-info to-primary rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                <i class="bi bi-camera text-white text-3xl"></i>
              </div>
              <div class="text-center">
                <h3 class="text-2xl font-serif font-bold text-text mb-2 group-hover:text-info transition-colors">Capture Mark</h3>
                <p class="text-sm text-text-muted mb-4">Document and submit new stonemason marks</p>
                <div class="flex items-center justify-center gap-2 text-sm text-info font-medium">
                  <span>Start Contributing</span>
                  <i class="bi bi-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </div>
              </div>
            </div>
          </a>

          <!-- Marks Card -->
          <a routerLink="/marks"
             class="group relative bg-gradient-to-br from-surface-alt to-surface rounded-3xl p-8 sm:p-10 border-2 border-border hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 animate-fade-in-delay-6 sm:col-span-2 lg:col-span-1">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-info/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative space-y-6">
              <div class="w-20 h-20 bg-gradient-to-br from-primary to-info rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                <i class="bi bi-grid-3x3 text-white text-3xl"></i>
              </div>
              <div class="text-center">
                <h3 class="text-2xl font-serif font-bold text-text mb-2 group-hover:text-primary transition-colors">Marks</h3>
                <p class="text-sm text-text-muted mb-4">Browse and discover stonemason symbols</p>
                <div class="flex items-center justify-center gap-2 text-sm text-primary font-medium">
                  <span>12,483 Marks</span>
                  <i class="bi bi-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </div>
              </div>
            </div>
          </a>

        </div>

      </div>

      <!-- Scroll Indicator -->
      <button
        (click)="scrollToContent()"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block cursor-pointer hover:text-primary transition-colors group">
        <div class="flex flex-col items-center gap-2 text-text-muted group-hover:text-primary">
          <span class="text-xs font-medium">Scroll to explore</span>
          <i class="bi bi-chevron-down text-xl"></i>
        </div>
      </button>

    </section>

    <style>
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes slide-up {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 3s ease infinite;
      }

      .animate-fade-in {
        animation: fade-in 0.6s ease-out forwards;
      }

      .animate-fade-in-delay {
        animation: fade-in 0.6s ease-out 0.1s forwards;
        opacity: 0;
      }

      .animate-fade-in-delay-2 {
        animation: fade-in 0.6s ease-out 0.2s forwards;
        opacity: 0;
      }

      .animate-fade-in-delay-3 {
        animation: fade-in 0.6s ease-out 0.3s forwards;
        opacity: 0;
      }

      .animate-fade-in-delay-4 {
        animation: fade-in 0.6s ease-out 0.4s forwards;
        opacity: 0;
      }

      .animate-fade-in-delay-5 {
        animation: fade-in 0.6s ease-out 0.5s forwards;
        opacity: 0;
      }

      .animate-fade-in-delay-6 {
        animation: fade-in 0.6s ease-out 0.6s forwards;
        opacity: 0;
      }

      .animate-slide-up {
        animation: slide-up 0.8s ease-out forwards;
      }
    </style>
  `,
})
export class HeroSectionComponent {
  scrollToContent(): void {
    const heroSection = document.querySelector('app-hero-section');
    if (heroSection) {
      const nextElement = heroSection.nextElementSibling;
      if (nextElement) {
        nextElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
