import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '@env/environment';

interface EmptyStateAction {
  label: string;
  routerLink: string;
  variant?: 'primary' | 'secondary';
}

@Component({
  selector: 'app-bookmarks-empty-state-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex justify-center items-center min-h-[500px] py-12 px-4">
      <div class="text-center">
        <!-- Icon Container -->
        <div class="relative inline-flex mb-8">
          <div class="absolute inset-0 bg-primary/10 rounded-full blur-2xl"></div>
          <div class="relative w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center border-2 border-primary/20">
            <i class="bi bi-bookmark-heart text-5xl text-primary" style="display: flex; align-items: center; justify-content: center;"></i>
          </div>
        </div>

        <!-- Title -->
        <h2 class="text-3xl font-serif font-bold text-text mb-3 tracking-tight">
          No bookmarks yet
        </h2>

        <!-- Subtitle -->
        <p class="text-base text-text-muted mb-10 leading-relaxed">
          Start exploring and save your favorite monuments and marks to access them easily later.
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            [href]="environment.baseUrl + '/search/monuments'"
            class="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-200 font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 w-full sm:w-auto justify-center">
            <i class="bi bi-building"></i>
            Explore Monuments
          </a>
          <a
            [href]="environment.baseUrl + '/search/marks'"
            class="inline-flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-border text-text rounded-xl hover:border-primary hover:text-primary transition-all duration-200 font-semibold hover:-translate-y-0.5 w-full sm:w-auto justify-center">
            <i class="bi bi-search"></i>
            Browse Marks
          </a>
        </div>

        <!-- Helper Text -->
        <p class="text-sm text-text-muted mt-8">
          <i class="bi bi-info-circle mr-1"></i>
          Click the bookmark icon on any monument or mark to save it here
        </p>
      </div>
    </div>
  `
})
export class EmptyStateSectionComponent {
  environment = environment;

  @Input() title = 'No bookmarks yet';
  @Input() subtitle = 'Start exploring and save your favorite monuments and marks to access them easily later.';
  @Input() actions: EmptyStateAction[] = [
    { label: 'Explore Monuments', routerLink: '/search/monuments', variant: 'primary' },
    { label: 'Browse Marks', routerLink: '/search/marks', variant: 'secondary' }
  ];
}
