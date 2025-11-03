import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [ngClass]="buttonClasses"
      [attr.aria-busy]="loading"
      class="relative inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 ease-ease-soft whitespace-nowrap"
    >
      <!-- Spinner -->
      <span
        *ngIf="loading"
        class="absolute w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
      ></span>

      <!-- Content -->
      <span [class.opacity-0]="loading">
        <ng-content></ng-content>
      </span>
    </button>
  `,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;

  get buttonClasses(): string[] {
    const base = [
      'focus:outline-none',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
    ];

    const variants: Record<string, string[]> = {
      primary: [
        'bg-primary',
        'text-primary-foreground',
        'border-transparent',
        'hover:opacity-90',
        'active:scale-95',
      ],
      secondary: [
        'bg-surface',
        'text-text',
        'border-border]',
        'hover:bg-surface-alt',
        'active:scale-95',
      ],
    };

    const width = this.fullWidth ? ['w-full'] : [];

    return [...base, ...(variants[this.variant] || []), ...width];
  }
}
