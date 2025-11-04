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
      [class.w-full]="fullWidth"
      [ngClass]="buttonClasses"
      [attr.aria-busy]="loading"
      class="relative inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 ease-soft whitespace-nowrap select-none"
    >
      <!-- Spinner -->
      @if (loading) {
        <i
          class="bi bi-arrow-repeat animate-spin text-base absolute"
          aria-hidden="true"
        ></i>
      }

      <!-- Button content -->
      <span [class.opacity-0]="loading">
        <ng-content></ng-content>
      </span>
    </button>
  `,
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;

  get buttonClasses(): string[] {
    const base = [
      'focus:outline-none',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'transition-all',
      'duration-200',
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
        'border-border',
        'hover:bg-surface-alt',
        'active:scale-95',
      ],
      outline: [
        'bg-transparent',
        'text-primary',
        'border-primary',
        'hover:bg-primary hover:text-primary-foreground',
        'active:scale-95',
      ],
    };

    return [...base, ...(variants[this.variant] || [])];
  }
}
