import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { AuthFormComponent } from '../../components/auth-form/auth-form';
import { BaseAuthComponent } from '@shared/directives/base-auth';
import {ProfileService} from '@core/services/profile.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AuthFormComponent],
  template: `
    <section class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      <app-auth-form
        mode="login"
        [loading]="loading"
        (submit)="onSubmit($event)"
        (toggleMode)="onToggleMode()"
        (googleAuth)="onGoogleAuth()"
        (forgotPassword)="onForgotPassword()"
      />
    </section>
  `
})
export class LoginComponent extends BaseAuthComponent {
  override mode: 'login' = 'login';
  override successMessage = 'Login successful!';
  override navigateTo = '/register';

  constructor(router: Router, authService: AuthService, profileService: ProfileService, notificationService: NotificationService) {
    super(router, authService, profileService, notificationService);
  }
}
