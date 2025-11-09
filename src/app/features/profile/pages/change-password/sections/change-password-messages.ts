import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-change-password-messages',
  template: `
    @if (submitSuccess) {
      <div class="mb-6 p-4 bg-success/10 border border-success/30 rounded-xl flex items-start gap-3">
        <i class="bi bi-check-circle-fill text-success text-xl"></i>
        <div>
          <p class="text-sm font-semibold text-success mb-1">Password changed successfully!</p>
          <p class="text-xs text-text-muted">You can now use your new password to log in.</p>
        </div>
      </div>
    }
    @if (submitError) {
      <div class="mb-6 p-4 bg-error/10 border border-error/30 rounded-xl flex items-start gap-3">
        <i class="bi bi-exclamation-triangle-fill text-error text-xl"></i>
        <div>
          <p class="text-sm font-semibold text-error mb-1">Failed to change password</p>
          <p class="text-xs text-text-muted">{{ errorMessage }}</p>
        </div>
      </div>
    }
  `,
  styles: []
})
export class ChangePasswordMessagesComponent {
  @Input() submitSuccess = false;
  @Input() submitError = false;
  @Input() errorMessage = '';
}
