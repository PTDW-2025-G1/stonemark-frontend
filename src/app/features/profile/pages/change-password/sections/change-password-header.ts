import { Component } from '@angular/core';

@Component({
  selector: 'app-change-password-header',
  template: `
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
        <i class="bi bi-shield-lock text-primary text-3xl"></i>
      </div>
      <h2 class="text-3xl sm:text-4xl font-serif font-bold text-text mb-2">
        Change Password
      </h2>
      <p class="text-text-muted">
        Keep your account secure with a strong password
      </p>
    </div>
  `,
  styles: []
})
export class ChangePasswordHeaderComponent {}
