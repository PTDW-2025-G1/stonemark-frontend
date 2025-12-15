import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-password-help',
  standalone: true,
  imports: [RouterLink],
  template: `
    <p class="text-center text-sm text-text-muted mt-6">
      @if (mode === 'change') {
        Forgot your current password?
        <a routerLink="/forgot-password" class="text-primary hover:underline font-semibold">
          Reset it here
        </a>
      } @else if (mode === 'reset') {
        Remembered your password?
        <a routerLink="/login" class="text-primary hover:underline font-semibold">
          Go back to login
        </a>
      } @else {
        Want to secure your account?
        <a routerLink="/profile/security" class="text-primary hover:underline font-semibold">
          Go to security settings
        </a>
      }
    </p>
  `,
  styles: []
})
export class PasswordHelpComponent {
  @Input() mode: 'change' | 'set' | 'reset' = 'change';
}
