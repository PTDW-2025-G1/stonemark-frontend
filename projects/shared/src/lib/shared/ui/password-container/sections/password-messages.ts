import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-password-messages',
  standalone: true,
  template: `
    @if (submitSuccess) {
      <div class="mb-6 p-4 bg-success/10 border border-success/30 rounded-xl flex items-start gap-3">
        <i class="bi bi-check-circle-fill text-success text-xl"></i>
        <div>
          <p class="text-sm font-semibold text-success mb-1">
            {{ mode === 'change' ? 'Password changed successfully!' : 'Password reset successfully!' }}
          </p>
          <p class="text-xs text-text-muted">
            {{ mode === 'change'
              ? 'You can now use your new password to log in.'
              : 'You can now log in with your new password.' }}
          </p>
        </div>
      </div>
    }

    @if (submitError) {
      <div class="mb-6 p-4 bg-error/10 border border-error/30 rounded-xl flex items-start gap-3">
        <i class="bi bi-exclamation-triangle-fill text-error text-xl"></i>
        <div>
          <p class="text-sm font-semibold text-error mb-1">
            {{ mode === 'change' ? 'Failed to change password' : 'Failed to reset password' }}
          </p>
          <p class="text-xs text-text-muted">{{ errorMessage }}</p>
        </div>
      </div>
    }
  `,
  styles: []
})
export class PasswordMessagesComponent {
  @Input() mode: 'change' | 'reset' = 'change';
  @Input() submitSuccess = false;
  @Input() submitError = false;
  @Input() errorMessage = '';
}
