import { Directive } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '@core/services/auth/auth.service';
import { AuthFormData } from '../../../../../auth/src/app/features/auth/components/auth-form/auth-form';
import {HttpResponse} from '@angular/common/http';
import { environment } from '@env/environment';
import {AuthenticationResponseDto} from '@api/model/authentication-response-dto';

@Directive()
export abstract class BaseAuthComponent {
  loading = false;
  errorMsg: string | null = null;

  protected constructor(
    protected router: Router,
    protected authService: AuthService
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
    auth$: Observable<HttpResponse<AuthenticationResponseDto>>,
  ): void {
    this.loading = true;

    auth$
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          const status = response.status;
          const body = response.body;

          if (status === 200 && body?.accessToken) {
            const { accessToken, refreshToken, role } = body;

            this.authService.saveTokens(accessToken, refreshToken!, role);
            this._postLoginRedirect(role);
          } else if (status === 202) {
            this.router.navigate(['/verify-pending']);
          }
        },
        error: (err) => {
          this.loading = false;
          const msg = err?.error || err?.message || '';
          if (err.status === 401) {
            this.errorMsg = '';
          } else if (msg) {
            this.errorMsg = msg;
          } else {
            this.errorMsg = 'Unexpected error.';
          }
        },
      });
  }

  private _postLoginRedirect(role?: string | null): void {
    console.log('Role from auth response:', role);

    const redirect = localStorage.getItem('redirectAfterLogin');

    if (redirect && redirect.startsWith('http://localhost:')) {
      console.log('Redirecting back to original URL:', redirect);
      localStorage.removeItem('redirectAfterLogin');
      window.location.href = redirect;
      return;
    }

    if (role === 'ADMIN' || role === 'MODERATOR') {
      console.log('Redirecting to staff:', environment.staffUrl);
      window.location.href = environment.staffUrl;
      return;
    }

    console.log('Redirecting to base app:', environment.baseUrl);
    window.location.href = environment.baseUrl;
  }



}
