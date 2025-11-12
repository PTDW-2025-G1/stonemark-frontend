import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../projects/shared/src/lib/core/services/auth.service';
import { NotificationService } from '../../../../../../projects/shared/src/lib/core/services/notification.service';
import { AuthFormComponent } from '@features/auth/components/auth-form/auth-form';
import { BaseAuthComponent } from '../../../../../../projects/shared/src/lib/shared/directives/base-auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, AuthFormComponent],
  template: `
    <section class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      <app-auth-form
        mode="register"
        [loading]="loading"
        (submit)="onSubmit($event)"
        (toggleMode)="onToggleMode()"
        (googleAuth)="onGoogleAuth()"
        (githubAuth)="onGithubAuth()"
      />
    </section>
  `
})
export class RegisterComponent extends BaseAuthComponent {
  override mode: 'register' = 'register';
  override successMessage = 'Registration successful!';
  override navigateTo = '/login';

  constructor(router: Router, authService: AuthService, notificationService: NotificationService) {
    super(router, authService, notificationService);
  }
}
