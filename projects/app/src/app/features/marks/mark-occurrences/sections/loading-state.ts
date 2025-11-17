import { Component } from '@angular/core';

@Component({
  selector: 'app-mark-occurrences-loading-state',
  template: `
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 animate-pulse">
          <i class="bi bi-hourglass-split text-primary text-2xl"></i>
        </div>
        <p class="text-text-muted">Loading occurrences...</p>
      </div>
    </div>
  `,
  styles: []
})
export class LoadingStateComponent {}
