import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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
              <img src="https://www.ecotoursportugal.com/content/uploads/maingallery/crops/5872_default_1619184145.jpg"
                   alt="Monument"
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500"></div>
            </div>

            <div class="relative z-10 flex flex-col items-center">
              <div class="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center text-xl mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <svg fill="#ffffff" height="80%" width="80%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496" stroke="#ffffff"><g><path d="M290.216,0h-84.432L0,123.472V160v8v32h16v216H0v32v8v40h496v-40v-8v-32h-16V200h16v-32v-8v-36.528L290.216,0z M16,168 h64v16H16V168z M144,200v216h-16v32H96v-32H80V200h16v-32h32v32H144z M288,200v216h-16v32h-48v-32h-16V200h16v-32h48v32H288z M416,200v216h-16v32h-32v-32h-16V200h16v-32h32v32H416z M352,184h-64v-16h64V184z M336,200v216h-32V200H336z M352,432v16h-64 v-16H352z M208,184h-64v-16h64V184z M192,200v216h-32V200H192z M208,432v16h-64v-16H208z M64,200v216H32V200H64z M16,432h64v16 H16V432z M480,480H16v-16h464V480z M480,448h-64v-16h64V448z M432,416V200h32v216H432z M480,184h-64v-16h64V184z M480,152H16 v-19.472L210.216,16h75.568L480,132.528V152z"></path><path d="M221.848,32L42.216,136h411.568L274.152,32H221.848z M101.784,120l124.36-72h43.704l124.36,72H101.784z"></path></g></svg>
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
              <img src="https://www.portugalresident.com/wp-content/uploads/2025/10/Silves-stone-marks-1416.jpg"
                   alt="Stone Marks"
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500"></div>
            </div>

            <div class="relative z-10 flex flex-col items-center">
              <div class="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center text-xl mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M352.75 39.47l-33.094 83.374 111.156 111.28 58.22-58.28L352.75 39.47zm-160.344 5.218c-98.25 66.974-166.87 161.246-169.47 288.906 62.25-119.817 162.457-225.092 255.22-269.75l-85.75-19.157zM97.75 60.156L68.187 89.72c7.276 6.96 14.53 13.893 21.813 20.843 8.887-10.39 18.37-20.35 28.313-29.907l-20.563-20.5zm353.813 0L425.688 86l28.718 28.75c8.91-8.36 17.822-16.728 26.72-25.094l-29.563-29.5zm-263.938 89.75c-9.44 8.552-18.824 17.596-28.063 27.063 25.263 24.13 50.526 48.323 75.688 72.75l26.188-26.126-73.813-73.688zm153.313 20.72L68 443.155l29.313 29.22c83.48-96.13 175.757-186.498 269.812-275.532l-26.188-26.22zm-28.25 104.155c-8.692 8.42-17.35 16.853-25.97 25.314 55.896 55.38 111.166 112.353 165.157 172.437l29.438-29.374L312.688 274.78z"></path></g></svg>
              </div>
              <h3 class="text-xl font-serif font-bold text-white mb-1 tracking-wide">Stone Marks</h3>
              <p class="text-sm text-gray-200 mb-4 font-light">Symbol catalog</p>
              <span class="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white group-hover:bg-white group-hover:text-primary transition-colors duration-300">
                12,483 Marks
              </span>
            </div>
          </a>

          <a href="https://t.me/stonemarkbot" target="_blank" rel="noopener noreferrer" class="group relative h-64 rounded-3xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center text-center p-6">

            <div class="absolute inset-0">
              <img src="https://i.ibb.co/rRTdYbPs/image.jpg"
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
