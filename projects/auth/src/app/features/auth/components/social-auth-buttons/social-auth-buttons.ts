import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social-auth-buttons',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid gap-4 sm:grid-cols-1">
      <!-- Google -->
      <button
        type="button"
        (click)="googleClick.emit()"
        class="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-text
               bg-surface border-2 border-border rounded-lg
               hover:bg-surface-alt hover:border-text-muted
               active:scale-95 transition-all duration-200 ease-soft focus:outline-none
               focus:ring-2 focus:ring-black/10"
      >
        <i class="bi bi-google text-xl text-primary"></i>
        <span>Google</span>
      </button>
    </div>
  `
})
export class SocialAuthButtonsComponent {
  @Output() googleClick = new EventEmitter<void>();
}
