import { Directive } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '@core/services/notification.service';
import { AuthService } from '@core/services/auth.service';
import { AuthFormData } from '../../../../../auth/src/app/features/auth/components/auth-form/auth-form';
import {HttpResponse} from '@angular/common/http';
import { environment } from '@env/environment';

@Directive()
export abstract class BaseAuthComponent {
  loading = false;

  protected constructor(
    protected router: Router,
    protected authService: AuthService,
    protected notificationService: NotificationService
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

  onGithubAuth(): void {
    this._handleAuthRequest(this.authService.githubAuth(), 'GitHub authentication successful!');
  }

  private _handleAuthRequest(auth$: Observable<HttpResponse<any>>, successMessage: string): void {
    this.loading = true;
    auth$.pipe(finalize(() => (this.loading = false))).subscribe({
      next: (response) => {
        const status = response.status;
        const body = response.body;

        if (status === 200 && body?.accessToken) {
          this.notificationService.showSuccess(successMessage);
          window.location.href = environment.baseUrl
        }else if(status === 202){
          const email = body?.email || '';
          this.router.navigate(['/verify-pending'], {
            queryParams: { email }
          });
        }
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Authentication failed. Please try again.';
        this.notificationService.showError(errorMessage, err);
      },
    });
  }
}
