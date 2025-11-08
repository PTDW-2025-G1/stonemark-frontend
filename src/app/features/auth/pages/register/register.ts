import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthFormComponent, AuthFormData } from '@features/auth/components/auth-form/auth-form';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service'; // Assuming this service exists

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
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
export class SignupComponent {
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService // Inject NotificationService
  ) {}

  onSubmit(data: AuthFormData): void {
    this._handleAuthRequest(this.authService.register(data), 'Registration successful!');
  }

  onToggleMode(): void {
    this.router.navigate(['/login']).catch(error => {
      this.notificationService.showError('Navigation failed.', error);
    });
  }

  onGoogleAuth(): void {
    this._handleAuthRequest(this.authService.googleAuth(), 'Google authentication successful!');
  }

  onGithubAuth(): void {
    this._handleAuthRequest(this.authService.githubAuth(), 'GitHub authentication successful!');
  }

  private _handleAuthRequest(auth$: Observable<any>, successMessage: string): void {
    this.loading = true;
    auth$.pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: () => {
        this.notificationService.showSuccess(successMessage);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Authentication failed. Please try again.';
        this.notificationService.showError(errorMessage, err);
      }
    });
  }
}
