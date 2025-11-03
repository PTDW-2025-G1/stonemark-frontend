import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
  template: `
    <div class="flex flex-col gap-1">
      <!-- Label -->
      <label *ngIf="label" class="text-sm font-medium text-text">
        {{ label }}
      </label>

      <!-- Wrapper -->
      <div class="relative">
        <input
          [type]="currentType"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          (input)="onInput($event)"
          (blur)="onTouched()"
          [ngClass]="[
            'w-full rounded-lg border px-4 py-2.5 text-sm transition-all duration-200',
            'bg-surface text-text',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
            error
              ? 'border-error focus:border-error focus:ring-2 focus:ring-error/30'
              : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
          ]"
        />

        <!-- Toggle password -->
        <button
          *ngIf="showPasswordToggle && type === 'password'"
          type="button"
          (click)="togglePasswordVisibility()"
          tabindex="-1"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
        >
          <svg
            *ngIf="!passwordVisible"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <svg
            *ngIf="passwordVisible"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
            ></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        </button>
      </div>

      <!-- Error -->
      <span *ngIf="error" class="text-xs text-error mt-1">
        {{ error }}
      </span>
    </div>
  `,
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() placeholder = '';
  @Input() error: string | null = null;
  @Input() showPasswordToggle = false;

  value = '';
  disabled = false;
  passwordVisible = false;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  get currentType(): string {
    return this.type === 'password' && this.passwordVisible ? 'text' : this.type;
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
