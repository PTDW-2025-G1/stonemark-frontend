import { Component, Input } from '@angular/core';

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
        ></i>
      </div>

      <h2 class="text-3xl sm:text-4xl font-serif font-bold text-text mb-2">
        {{ mode === 'change' ? 'Change Password' : 'Reset Password' }}
      </h2>

      <p class="text-text-muted">
        {{
          mode === 'change'
            ? 'Keep your account secure with a strong password'
            : 'Enter your new password to regain access to your account'
        }}
      </p>
    </div>
  `,
  styles: []
})
export class PasswordHeaderComponent {
  @Input() mode: 'change' | 'reset' = 'change';
}
