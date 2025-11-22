import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div class="max-w-4xl w-full text-center">

        <!-- Animated 404 -->
        <div class="mb-6 sm:mb-8 relative">
          <div class="absolute inset-0 flex items-center justify-center opacity-10">
            <div class="w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div class="relative">
            <h1 class="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-serif font-bold text-primary leading-none tracking-tighter animate-fade-in">
              404
            </h1>
            <div class="absolute inset-0 flex items-center justify-center">
              <i class="bi bi-compass text-4xl sm:text-6xl md:text-8xl text-primary/20 animate-spin-slow"></i>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="space-y-4 sm:space-y-6 animate-slide-up px-2">
          <!-- Title -->
          <div>
            <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-text mb-3 sm:mb-4">
              Lost in History
            </h2>
            <p class="text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed px-4">
              It seems you've wandered off the beaten path. The page you're looking for has been lost to time,
              much like an undiscovered stone mark waiting to be found.
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-4 px-4">
            <button
              (click)="goBack()"
              class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 text-base sm:text-lg">
              <i class="bi bi-arrow-left"></i>
              Go Back
            </button>

            <button
              (click)="goHome()"
              class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-surface-alt border-2 border-border text-text rounded-xl font-bold hover:border-primary transition-all flex items-center justify-center gap-2 text-base sm:text-lg">
              <i class="bi bi-house-door"></i>
              Home Page
            </button>
          </div>

          <!-- Help Text -->
          <div class="pt-6 sm:pt-8 border-t border-border mt-6 sm:mt-8 px-4">
            <p class="text-xs sm:text-sm text-text-muted mb-2 sm:mb-3">
              Still lost? We're here to help!
            </p>
            <a
              routerLink="/contact"
              class="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold text-sm sm:text-base">
              <i class="bi bi-chat-dots"></i>
              Contact Support
            </a>
          </div>
        </div>

        <!-- Decorative Elements -->
        <div class="absolute top-10 sm:top-20 left-4 sm:left-10 opacity-5 pointer-events-none hidden md:block">
          <i class="bi bi-stars text-6xl sm:text-9xl text-primary"></i>
        </div>
        <div class="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 opacity-5 pointer-events-none hidden md:block">
          <i class="bi bi-geo-alt text-6xl sm:text-9xl text-primary"></i>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes slide-up {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes spin-slow {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .animate-fade-in {
      animation: fade-in 0.8s ease-out;
    }

    .animate-slide-up {
      animation: slide-up 0.8s ease-out 0.2s backwards;
    }

    .animate-spin-slow {
      animation: spin-slow 20s linear infinite;
    }
  `]
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  goBack(): void {
    window.history.back();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
