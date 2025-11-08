import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
    <div class="flex justify-center py-24">
      <div class="text-center py-16 sm:py-20 max-w-2xl">
          <div class="w-20 h-20 bg-surface-alt rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="bi bi-bookmark text-4xl text-text-muted"></i>
          </div>
          <h3 class="text-xl sm:text-2xl font-serif font-semibold text-text mb-2">
            No bookmarks yet
          </h3>
          <p class="text-text-muted mb-8">
            Start exploring and save your favorite monuments and marks to access them easily later.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a routerLink="/monuments" class="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all font-medium">
              Explore Monuments
            </a>
            <a routerLink="/marks" class="px-6 py-3 bg-surface-alt border-2 border-border text-text rounded-xl hover:border-primary transition-all font-medium">
              Browse Marks
            </a>
          </div>
        </div>
    </div>
  `
})
export class EmptyStateSectionComponent {
  @Input() title = 'No bookmarks yet';
  @Input() subtitle = 'Start exploring and save your favorite monuments and marks to access them easily later.';
  @Input() actions: EmptyStateAction[] = [
    { label: 'Explore Monuments', routerLink: '/monuments', variant: 'primary' },
    { label: 'Browse Marks', routerLink: '/marks', variant: 'secondary' }
  ];
}
