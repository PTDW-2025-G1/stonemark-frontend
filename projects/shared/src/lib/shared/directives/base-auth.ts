import { Directive } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import { AuthFormData } from '../../../../../auth/src/app/features/auth/components/auth-form/auth-form';
import {HttpResponse} from '@angular/common/http';
import { environment } from '@env/environment';
import {ProfileService} from '@core/services/profile.service';

@Directive()
export abstract class BaseAuthComponent {
  loading = false;
  errorMsg: string | null = null;

  protected constructor(
    protected router: Router,
    protected authService: AuthService,
    protected profileService: ProfileService,
  ) {}

  abstract mode: 'login' | 'register';
  abstract navigateTo: string;

  onSubmit(data: AuthFormData): void {
    const auth$ = this.mode === 'login'
      ? this.authService.login(data)
      : this.authService.register(data);

    this._handleAuthRequest(auth$);
  }

  onForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  onToggleMode(): void {
    this.router.navigate([this.navigateTo]).catch(error => {});
  }

  onGoogleAuth(): void {
    this._handleAuthRequest(this.authService.googleAuth());
  }

  private _handleAuthRequest(
    auth$: Observable<HttpResponse<any>>,
    ): void {
    this.loading = true;
    auth$
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          const status = response.status;
          const body = response.body;

          if (status === 200 && body?.accessToken) {
            this.authService.saveTokens(body.accessToken, body.refreshToken);
            this._postLoginRedirect();
          } else if (status === 202) {
            this.router.navigate(['/verify-pending']);
          }
        },
        error: (err) => {
          this.loading = false;
          const msg = err?.error || err?.message || '';
          if (err.status === 401) {
            this.errorMsg = 'Invalid email or password.';
          } else if (msg) {
            this.errorMsg = msg;
          } else {
            this.errorMsg = 'Unexpected error.';
          }
          console.error(err);
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
        this.authService.logout();
      }
    });
  }


}
