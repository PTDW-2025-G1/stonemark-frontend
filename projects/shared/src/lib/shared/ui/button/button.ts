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
      [ngClass]="classes"
      class="group relative inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none overflow-hidden"
    >
      @if (variant === 'primary') {
        <div class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      }

      @if (loading) {
        <span class="absolute flex items-center justify-center">
          <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      }

      <span [class.opacity-0]="loading" class="flex items-center gap-2 relative z-10">
        <ng-content></ng-content>
      </span>
    </button>
  `,
  host: {
    '[class.w-full]': 'fullWidth'
  },
  styles: [`
    :host { display: inline-block; }
    :host(.w-full) { display: block; width: 100%; }
  `]
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;

  get classes(): string {
    return [
      this.getSizeClasses(),
      this.getVariantClasses(),
      'active:scale-[0.98]', // Efeito tátil ao clicar
    ].join(' ');
  }

  private getSizeClasses(): string {
    switch (this.size) {
      case 'sm': return 'h-9 px-4 text-xs rounded-lg';
      case 'lg': return 'h-12 px-8 text-base rounded-xl';
      default:   return 'h-11 px-6 text-sm rounded-xl'; // md
    }
  }

  private getVariantClasses(): string {
    switch (this.variant) {
      case 'primary':
        return 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 border border-transparent';

      case 'secondary':
        return 'bg-surface text-text border border-border hover:bg-surface-alt hover:border-primary/30 shadow-sm hover:shadow-md';

      case 'outline':
        return 'bg-transparent text-primary border-2 border-primary hover:bg-primary/5';

      case 'ghost':
        return 'bg-transparent text-text-muted hover:text-primary hover:bg-primary/10 border border-transparent';

      case 'danger':
        return 'bg-red-500 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5 border border-transparent';

      default:
        return '';
    }
  }
}
