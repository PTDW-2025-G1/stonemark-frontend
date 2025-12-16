import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-password-header',
  template: `
    <div class="text-center mb-8">
      <div
        class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4"
      >
        <i
          class="text-primary text-3xl"
          [class.bi-shield-lock]="mode === 'change'"
          [class.bi-key]="mode === 'reset'"
          [class.bi-shield-check]="mode === 'set'"
        ></i>
      </div>

      <h2 class="text-3xl sm:text-4xl font-serif font-medium text-text mb-2">
        {{ title }}
      </h2>

      <p class="text-text-muted">
        {{ description }}
      </p>
    </div>
  `
})
export class PasswordHeaderComponent {
  @Input() mode: 'change' | 'set' | 'reset' = 'change';

  get title(): string {
    switch (this.mode) {
      case 'set':
        return 'Set Password';
      case 'reset':
        return 'Reset Password';
      default:
        return 'Change Password';
    }
  }

  get description(): string {
    switch (this.mode) {
      case 'set':
        return 'Create a password to secure your account';
      case 'reset':
        return 'Enter your new password to regain access to your account';
      default:
        return 'Keep your account secure with a strong password';
    }
  }
}
