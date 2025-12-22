import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MONUMENTS_ICON, MARKS_ICON } from '@core/constants/content-icons';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <section class="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-surface pt-20 pb-32">
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="text-center max-w-4xl mx-auto mb-16 sm:mb-24">

          <div class="inline-block border border-border px-3 py-1 text-xs uppercase tracking-widest font-bold mb-6 bg-surface-alt">
            Digital Archive
          </div>

          <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium text-text leading-[1.05] tracking-tight mb-6 animate-slide-up">
            Uncover the history
            <span class="block text-text-muted italic font-light relative">
              etched in stone.
              <svg class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
            </span>
          </h1>

          <p class="text-lg sm:text-xl text-text-muted/90 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-delay mb-10">
            Join a global community documenting stonemason marks.
            From medieval monasteries to hidden chapels, help us preserve the signatures of the past.
          </p>

          <div class="animate-fade-in-delay-2">
            <a routerLink="/search/monuments"
               class="px-8 py-4 text-sm font-bold tracking-wide border border-primary bg-primary text-primary-foreground rounded-lg hover:bg-surface hover:text-primary hover:border-primary transition-colors duration-200 ease-soft shadow-sm">
              Start Exploring
              <i class="bi bi-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-fade-in-delay-3">

          <a routerLink="/search/monuments" class="group relative h-64 rounded-3xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center text-center p-6">

            <div class="absolute inset-0">
              <img src="/assets/images/home_featured_monuments.jpg"
                   alt="Monument"
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500"></div>
            </div>

            <div class="relative z-10 flex flex-col items-center">
              <div class="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center text-xl mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <span [innerHTML]="MONUMENTS_ICON"></span>
              </div>
              <h3 class="text-xl font-serif font-bold text-white mb-1 tracking-wide">Monuments</h3>
              <p class="text-sm text-gray-200 mb-4 font-light">Map of historic sites</p>
              <span class="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white group-hover:bg-white group-hover:text-primary transition-colors duration-300">
                2,547 Sites
              </span>
            </div>
          </a>

          <a routerLink="/search/marks" class="group relative h-64 rounded-3xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center text-center p-6">

            <div class="absolute inset-0">
              <img src="/assets/images/home_featured_marks.jpg"
                   alt="Mason Marks"
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500"></div>
            </div>

            <div class="relative z-10 flex flex-col items-center">
              <div class="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center text-xl mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <span [innerHTML]="MARKS_ICON"></span>
              </div>
              <h3 class="text-xl font-serif font-bold text-white mb-1 tracking-wide">Mason Marks</h3>
              <p class="text-sm text-gray-200 mb-4 font-light">Symbol catalog</p>
              <span class="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white group-hover:bg-white group-hover:text-primary transition-colors duration-300">
                12,483 Marks
              </span>
            </div>
          </a>

          <a href="https://t.me/stonemarkbot" target="_blank" rel="noopener noreferrer" class="group relative h-64 rounded-3xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center text-center p-6">

            <div class="absolute inset-0">
              <img src="/assets/images/home_featured_contribute.jpg"
                   alt="Contribute"
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500"></div>
            </div>

            <div class="relative z-10 flex flex-col items-center">
              <div class="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <i class="bi bi-camera"></i>
              </div>
              <h3 class="text-xl font-serif font-bold text-white mb-1 tracking-wide">Contribute</h3>
              <p class="text-sm text-gray-200 mb-4 font-light">Add new discoveries</p>
              <span class="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white group-hover:bg-white group-hover:text-primary transition-colors duration-300">
                Join 850+ Curators
              </span>
            </div>
          </a>

        </div>
      </div>

      <button
        (click)="scrollToContent()"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted/60 hover:text-primary transition-colors group cursor-pointer animate-bounce">
        <span class="text-[10px] uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity">Scroll</span>
        <i class="bi bi-arrow-down text-xl"></i>
      </button>

    </section>
  `,
  styles: [`
    .animate-pulse-slow {
      animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
      50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
    }
  `]
})
export class HeroSectionComponent {
  MONUMENTS_ICON: SafeHtml;
  MARKS_ICON: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    this.MONUMENTS_ICON = this.sanitizer.bypassSecurityTrustHtml(MONUMENTS_ICON);
    this.MARKS_ICON = this.sanitizer.bypassSecurityTrustHtml(MARKS_ICON);
  }

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
