import { Directive } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

import { AuthService } from '@core/services/auth/auth.service';
import { AuthenticationResponseDto } from '@api/model/authentication-response-dto';
import { environment } from '@env/environment';

@Directive()
export abstract class BaseAuthComponent {
  loading = false;
  errorMsg: string | null = null;

  // 🔐 2FA state
  tfaRequired = false;
  tfaCodeSent = false;

  protected pendingLoginData: {
    username: string;
    password: string;
  } | null = null;

  protected constructor(
    protected router: Router,
    protected authService: AuthService
  ) {}

  abstract mode: 'login' | 'register';
  abstract navigateTo: string;

  /* ----------------------------
   * FORM SUBMIT (LOGIN / REGISTER)
   * ---------------------------- */
  onSubmit(data: any): void {
    this.errorMsg = null;

    if (this.mode === 'login') {
      this.pendingLoginData = {
        username: data.username,
        password: data.password,
      };
    }

    const payload =
      this.mode === 'login'
        ? {
          username: data.username,
          password: data.password,
        }
        : {
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          password: data.password,
        };

    const auth$ =
      this.mode === 'login'
        ? this.authService.login(payload)
        : this.authService.register(payload);

    this._handleAuthRequest(auth$);
  }

  /* ----------------------------
   * SUBMIT 2FA CODE
   * ---------------------------- */
  onTfaSubmit(code: string): void {
    if (!this.pendingLoginData) {
      this.errorMsg = 'Authentication session expired. Please login again.';
      this.resetTfaState();
      return;
    }

    this._handleAuthRequest(
      this.authService.login({
        ...this.pendingLoginData,
        tfaCode: code,
      })
    );
  }

  /* ----------------------------
   * UI ACTIONS
   * ---------------------------- */
  onForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  onToggleMode(): void {
    this.router.navigate([this.navigateTo]).catch(() => {});
  }

  onGoogleAuth(): void {
    this._handleAuthRequest(this.authService.googleAuth());
  }

  /* ----------------------------
   * AUTH HANDLER (CORE LOGIC)
   * ---------------------------- */
  /* ----------------------------
 * AUTH HANDLER (CORE LOGIC)
 * ---------------------------- */
  private _handleAuthRequest(
    auth$: Observable<HttpResponse<AuthenticationResponseDto>>
  ): void {
    this.loading = true;
    this.errorMsg = null;

    auth$
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        // ✅ SUCCESS PATH (2xx)
        next: (response) => {
          const body = response.body;

          if (!body) {
            this.errorMsg = 'Unexpected authentication response.';
            return;
          }

          // 🔐 2FA REQUIRED (backend returned 200 + flag)
          if (body.tfaRequired === true) {
            this.tfaRequired = true;
            this.tfaCodeSent = !!body.tfaCodeSent;
            this.errorMsg = null;
            return;
          }

          // ✅ LOGIN COMPLETE
          if (body.accessToken) {
            this.authService.saveTokens(
              body.accessToken,
              body.refreshToken!,
              body.role
            );

            this.resetTfaState();
            this._postLoginRedirect(body.role);
            return;
          }

          // ❌ FALLBACK
          this.errorMsg = 'Authentication failed.';
        },

        error: (err) => {
          const message = err?.error?.message;

          // 2FA required
          if (
            err.status === 401 &&
            typeof message === 'string' &&
            message.includes('Two-Factor Authentication')
          ) {
            this.tfaRequired = true;
            this.tfaCodeSent = false; // TOTP → código vem do authenticator
            this.errorMsg = null;
            return;
          }

          // ❌ REAL ERROR
          if (message) {
            this.errorMsg = message;
          } else {
            this.errorMsg = 'Occorred an error. Please try again later.';
          }
        },
      });
  }

  /* ----------------------------
   * POST LOGIN REDIRECT
   * ---------------------------- */
  private _postLoginRedirect(role?: string | null): void {
    const redirect = localStorage.getItem('redirectAfterLogin');

    // Check if there's a valid redirect URL from one of our apps
    if (redirect && this._isValidRedirectUrl(redirect)) {
      localStorage.removeItem('redirectAfterLogin');
      window.location.href = redirect;
      return;
    }

    window.location.href = environment.baseUrl;
  }

  /* ----------------------------
   * VALIDATE REDIRECT URL
   * ---------------------------- */
  private _isValidRedirectUrl(url: string): boolean {
    try {
      const validOrigins = [
        environment.baseUrl,
        environment.authUrl,
        environment.profileUrl,
        environment.staffUrl
      ];

      // Check if the URL starts with any of our valid origins
      return validOrigins.some(origin => url.startsWith(origin));
    } catch {
      return false;
    }
  }

  /* ----------------------------
   * RESET 2FA STATE
   * ---------------------------- */
  private resetTfaState(): void {
    this.tfaRequired = false;
    this.tfaCodeSent = false;
    this.pendingLoginData = null;
  }
}
