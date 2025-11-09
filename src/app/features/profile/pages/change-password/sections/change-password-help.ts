import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-change-password-help',
  template: `
    <p class="text-center text-sm text-text-muted mt-6">
      Forgot your current password?
      <a routerLink="/forgot-password" class="text-primary hover:underline font-semibold">Reset it here</a>
    </p>
  `,
  imports: [
    RouterLink
  ],
  styles: []
})
export class ChangePasswordHelpComponent {}
