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
    <div class="flex flex-col gap- w-full">
      <!-- Label -->
      @if (label) {
        <label class="text-sm font-medium text-text">{{ label }}</label>
      }

      <!-- Input wrapper -->
      <div class="relative">
        <input
          [type]="currentType"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          (input)="onInput($event)"
          (blur)="onTouched()"
          class="w-full rounded-lg border px-4 py-2.5 text-sm transition-all duration-200
                 bg-surface text-text placeholder:text-text-muted
                 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                 disabled:opacity-50 disabled:cursor-not-allowed
                 border-border"
          [class.border-error]="error"
        />

        <!-- Password toggle -->
        @if (showPasswordToggle && type === 'password') {
          <button
            type="button"
            (click)="togglePasswordVisibility()"
            tabindex="-1"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
            aria-label="Toggle password visibility"
          >
            @if (!passwordVisible) {
              <i class="bi bi-eye text-lg"></i>
            } @else {
              <i class="bi bi-eye-slash text-lg"></i>
            }
          </button>
        }
      </div>

      <!-- Error message -->
      @if (error) {
        <span class="text-xs text-error mt-1">{{ error }}</span>
      }
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
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
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
