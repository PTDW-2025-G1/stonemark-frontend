import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-surface flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl w-full text-center">

        <!-- Animated 404 -->
        <div class="mb-8 relative">
          <div class="absolute inset-0 flex items-center justify-center opacity-10">
            <div class="w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div class="relative">
            <h1 class="text-[12rem] sm:text-[16rem] lg:text-[20rem] font-serif font-bold text-primary leading-none tracking-tighter animate-fade-in">
              404
            </h1>
            <div class="absolute inset-0 flex items-center justify-center">
              <i class="bi bi-compass text-6xl sm:text-8xl text-primary/20 animate-spin-slow"></i>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="space-y-6 animate-slide-up">
          <!-- Title -->
          <div>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-text mb-4">
              Lost in History
            </h2>
            <p class="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
              It seems you've wandered off the beaten path. The page you're looking for has been lost to time,
              much like an undiscovered stone mark waiting to be found.
            </p>
          </div>

          <!-- Suggestions -->
          <div class="bg-surface-alt rounded-2xl border border-border p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 class="text-lg font-bold text-text mb-4 flex items-center justify-center gap-2">
              <i class="bi bi-signpost-2 text-primary"></i>
              Where would you like to go?
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                (click)="goHome()"
                class="group flex items-center gap-3 p-4 bg-surface border border-border rounded-xl hover:border-primary hover:shadow-lg transition-all">
                <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="bi bi-house-door text-primary text-xl"></i>
                </div>
                <div class="text-left">
                  <p class="font-bold text-text">Home</p>
                  <p class="text-xs text-text-muted">Return to homepage</p>
                </div>
              </button>

              <button
                (click)="goToMarks()"
                class="group flex items-center gap-3 p-4 bg-surface border border-border rounded-xl hover:border-primary hover:shadow-lg transition-all">
                <div class="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="bi bi-star text-info text-xl"></i>
                </div>
                <div class="text-left">
                  <p class="font-bold text-text">Marks</p>
                  <p class="text-xs text-text-muted">Explore stone marks</p>
                </div>
              </button>

              <button
                (click)="goToMonuments()"
                class="group flex items-center gap-3 p-4 bg-surface border border-border rounded-xl hover:border-primary hover:shadow-lg transition-all">
                <div class="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="bi bi-building text-success text-xl"></i>
                </div>
                <div class="text-left">
                  <p class="font-bold text-text">Monuments</p>
                  <p class="text-xs text-text-muted">Discover monuments</p>
                </div>
              </button>

              <button
                (click)="goToProfile()"
                class="group flex items-center gap-3 p-4 bg-surface border border-border rounded-xl hover:border-primary hover:shadow-lg transition-all">
                <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="bi bi-person text-accent text-xl"></i>
                </div>
                <div class="text-left">
                  <p class="font-bold text-text">Profile</p>
                  <p class="text-xs text-text-muted">View your profile</p>
                </div>
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              (click)="goBack()"
              class="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 text-lg">
              <i class="bi bi-arrow-left"></i>
              Go Back
            </button>

            <button
              (click)="goHome()"
              class="px-8 py-4 bg-surface-alt border-2 border-border text-text rounded-xl font-bold hover:border-primary transition-all flex items-center gap-2 text-lg">
              <i class="bi bi-house-door"></i>
              Home Page
            </button>
          </div>

          <!-- Help Text -->
          <div class="pt-8 border-t border-border mt-8">
            <p class="text-sm text-text-muted mb-3">
              Still lost? We're here to help!
            </p>
            <a
              routerLink="/contact"
              class="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold">
              <i class="bi bi-chat-dots"></i>
              Contact Support
            </a>
          </div>
        </div>

        <!-- Decorative Elements -->
        <div class="absolute top-20 left-10 opacity-5 pointer-events-none hidden lg:block">
          <i class="bi bi-stars text-9xl text-primary"></i>
        </div>
        <div class="absolute bottom-20 right-10 opacity-5 pointer-events-none hidden lg:block">
          <i class="bi bi-geo-alt text-9xl text-primary"></i>
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

  goToMarks(): void {
    this.router.navigate(['/marks']);
  }

  goToMonuments(): void {
    this.router.navigate(['/monuments']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
