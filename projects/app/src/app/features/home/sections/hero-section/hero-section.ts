import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MONUMENTS_ICON, MARKS_ICON } from '@core/constants/content-icons';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ButtonComponent} from '@shared/ui/button/button';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink, CommonModule, ButtonComponent, TranslatePipe],
  template: `
    <section class="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-surface pt-20 pb-32">
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="text-center max-w-4xl mx-auto mb-16 sm:mb-24">

          <div class="inline-block border border-border px-3 py-1 text-xs uppercase tracking-widest font-bold mb-6 bg-surface-alt">
            {{ 'home-hero-section.label' | translate }}
          </div>

          <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium text-text leading-[1.05] tracking-tight mb-6 animate-slide-up">
            {{ 'home-hero-section.title_1' | translate }}
            <span class="block text-text-muted italic font-light relative">
            {{ 'home-hero-section.title_2' | translate }}
              <svg class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
            </span>
          </h1>

          <p class="text-lg sm:text-xl text-text-muted/90 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-delay mb-10">
            {{ 'home-hero-section.desc' | translate }}
          </p>

          <app-button
            variant="primary"
            size="normal"
            [fullWidth]="false"
            [routerLink]="'/search/monuments'"
          >
            {{ 'home-hero-section.explore' | translate }}
            <i class="bi bi-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </app-button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-fade-in-delay-3">

          <a routerLink="/search/monuments" class="group relative h-64 rounded-3xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center text-center p-6">
            <div class="absolute inset-0">
              <img src="/assets/images/home_featured_monuments.webp"
                   alt="Monument"
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500"></div>
            </div>
            <div class="relative z-10 flex flex-col items-center">
              <div class="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center text-xl mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <span [innerHTML]="MONUMENTS_ICON"></span>
              </div>
              <h3 class="text-xl font-serif font-bold text-white mb-1 tracking-wide">{{ 'shared-links.monuments' | translate }}</h3>
              <p class="text-sm text-gray-200 mb-4 font-light">{{ 'home-hero-section.monuments_desc' | translate }}</p>
              <span class="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white group-hover:bg-white group-hover:text-primary transition-colors duration-300">
            {{ 'home-hero-section.monuments_count' | translate }}
          </span>
            </div>
          </a>
          <a routerLink="/search/marks" class="group relative h-64 rounded-3xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center text-center p-6">
            <div class="absolute inset-0">
              <img src="/assets/images/home_featured_marks.webp"
                   alt="Mason Marks"
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500"></div>
            </div>
            <div class="relative z-10 flex flex-col items-center">
              <div class="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center text-xl mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <span [innerHTML]="MARKS_ICON"></span>
              </div>
              <h3 class="text-xl font-serif font-bold text-white mb-1 tracking-wide">{{ 'shared-links.marks_title' | translate }}</h3>
              <p class="text-sm text-gray-200 mb-4 font-light">{{ 'home-hero-section.marks_desc' | translate }}</p>
              <span class="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white group-hover:bg-white group-hover:text-primary transition-colors duration-300">
                 {{ 'home-hero-section.marks_count' | translate }}
              </span>
            </div>
          </a>
          <a routerLink="/contribute" class="group relative h-64 rounded-3xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center text-center p-6">
            <div class="absolute inset-0">
              <img src="/assets/images/home_featured_contribute.webp"
                   alt="Contribute"
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500"></div>
            </div>
            <div class="relative z-10 flex flex-col items-center">
              <div class="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <i class="bi bi-camera"></i>
              </div>
              <h3 class="text-xl font-serif font-bold text-white mb-1 tracking-wide">{{ 'home-hero-section.contribute_title' | translate }}</h3>
              <p class="text-sm text-gray-200 mb-4 font-light">{{ 'home-hero-section.contribute_desc' | translate }}</p>
              <span class="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white group-hover:bg-white group-hover:text-primary transition-colors duration-300">
                {{ 'home-hero-section.contribute_count' | translate }}
              </span>
            </div>
          </a>
        </div>
      </div>
      <button
        (click)="scrollToContent()"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted/60 hover:text-primary transition-colors group cursor-pointer animate-bounce">
        <span class="text-[10px] uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          {{ 'home-hero-section.scroll' | translate }}
        </span>
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
