import { Directive } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '@core/services/notification.service';
import { AuthService } from '@core/services/auth.service';
import { AuthFormData } from '../../../../../auth/src/app/features/auth/components/auth-form/auth-form';
import {HttpResponse} from '@angular/common/http';
import { environment } from '@env/environment';
import {ProfileService} from '@core/services/profile.service';

@Directive()
export abstract class BaseAuthComponent {
  loading = false;

  protected constructor(
    protected router: Router,
    protected authService: AuthService,
    protected profileService: ProfileService,
    protected notificationService: NotificationService,
  ) {}

  abstract mode: 'login' | 'register';
  abstract successMessage: string;
  abstract navigateTo: string;

  onSubmit(data: AuthFormData): void {
    const auth$ = this.mode === 'login'
      ? this.authService.login(data)
      : this.authService.register(data);

    this._handleAuthRequest(auth$, this.successMessage);
  }

  onForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  onToggleMode(): void {
    this.router.navigate([this.navigateTo]).catch(error => {
      this.notificationService.showError('Navigation failed.', error);
    });
  }

  onGoogleAuth(): void {
    this._handleAuthRequest(this.authService.googleAuth(), 'Google authentication successful!');
  }

  private _handleAuthRequest(
    auth$: Observable<HttpResponse<any>>,
    successMessage: string
    ): void {
    this.loading = true;
    auth$
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          const status = response.status;
          const body = response.body;

          if (status === 200 && body?.accessToken) {
            this.notificationService.showSuccess(successMessage);
            this.authService.saveTokens(body.accessToken, body.refreshToken);
            this._postLoginRedirect();
          } else if (status === 202) {
            this.router.navigate(['/verify-pending']);
          }
        },
        error: (err) => {
          const errorMessage = err.error?.message || 'Credentials are invalid. Please, try again.';
          this.notificationService.showError(errorMessage, err);
        },
      });
    }

  private _postLoginRedirect(): void {
    this.profileService.getCurrentUser().subscribe({
      next: (user) => {
        const role = user.role;

        if (role === 'ADMIN' || role === 'MODERATOR') {
          window.location.href = environment.staffUrl;
        } else {
          window.location.href = environment.baseUrl;
        }
      },
      error: (err) => {
        console.error('Failed to load user after login:', err);
        this.notificationService.showError('Failed to load user info. Try again.', err);
        this.authService.logout();
      }
    });
  }


}
