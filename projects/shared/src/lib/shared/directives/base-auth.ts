import { Directive } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '@core/services/auth/auth.service';
import { HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthenticationResponseDto } from '@api/model/authentication-response-dto';

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

  onSubmit(data: any): void {
    const payload =
      this.mode === 'login'
        ? { email: data.email, password: data.password }
        : {
          firstName: data.firstName,
          lastName: data.lastName,
          telephone: data.telephone,
          email: data.email,
          password: data.password
        };

    const auth$ =
      this.mode === 'login'
        ? this.authService.login(payload)
        : this.authService.register(payload);

    this._handleAuthRequest(auth$);
  }

  onForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  onToggleMode(): void {
    this.router.navigate([this.navigateTo]).catch(() => {});
  }

  onGoogleAuth(): void {
    this._handleAuthRequest(this.authService.googleAuth());
  }

  private _handleAuthRequest(
    auth$: Observable<HttpResponse<AuthenticationResponseDto>>
  ): void {
    this.loading = true;
    this.errorMsg = null;

    auth$
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          const status = response.status;
          const body = response.body;

          if (status === 200 && body?.accessToken) {
            const { accessToken, refreshToken, role } = body;

            this.authService.saveTokens(accessToken, refreshToken!, role);
            this.errorMsg = null;
            this._postLoginRedirect(role);

          } else if (status === 202) {
            this.router.navigate(['/verify-pending']);
          }
        },
        error: (err) => {
          this.loading = false;

          if (err.status === 401) {
            this.errorMsg = 'Invalid credentials. Please try again.';
          } else if (err.status === 202) {
            this.router.navigate(['/verify-pending']);
          } else if (err?.error?.message) {
            this.errorMsg = err.error.message;
          } else if (err?.message) {
            this.errorMsg = err.message;
          } else {
            this.errorMsg = 'Occorred an error. Please try again later.';
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
