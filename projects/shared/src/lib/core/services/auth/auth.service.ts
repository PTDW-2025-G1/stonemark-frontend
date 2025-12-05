import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { CookieService } from '@core/services/cookie/cookie.service';
import { AuthenticationRequestDto } from '@api/model/authentication-request-dto';
import { AuthenticationResponseDto } from '@api/model/authentication-response-dto';
import { RegisterRequestDto } from '@api/model/register-request-dto';
import { PasswordResetRequestDto } from '@api/model/password-reset-request-dto';
import { ResetPasswordRequestDto } from '@api/model/reset-password-request-dto';
import { ConfirmationResponseDto } from '@api/model/confirmation-response-dto';
import { CodeConfirmationRequestDto } from '@api/model/code-confirmation-request-dto';
import { GoogleAuthenticationRequestDto } from '@api/model/google-authentication-request-dto';
import { RefreshTokenRequestDto } from '@api/model/refresh-token-request-dto';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;
  private googleAuthSubject = new Subject<any>();
  private authStateSubject = new Subject<boolean>();

  authState$ = this.authStateSubject.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.loadGoogleGISSDK();
  }

  // Google Authentication
  private loadGoogleGISSDK(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => this.initializeGoogleGIS();
    document.head.appendChild(script);
  }

  private initializeGoogleGIS(): void {
    if (typeof google !== 'undefined' && google.accounts?.id) {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: this.handleGoogleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
    } else {
      console.error('Google Identity Services SDK not loaded.');
    }
  }

  private handleGoogleCredentialResponse(response: any): void {
    if (!response.credential) {
      this.googleAuthSubject.error('No credential found');
      return;
    }

    const payload: GoogleAuthenticationRequestDto = {
      token: response.credential
    };

    this.http.post<any>(`${this.baseUrl}/google`, payload, { observe: 'response' }).pipe(
      tap((apiResponse: HttpResponse<any>) => {
        const accessToken = apiResponse.body?.accessToken;
        const refreshToken = apiResponse.body?.refreshToken;
        const role = apiResponse.body?.role;

        if (accessToken && refreshToken) {
          this.saveTokens(accessToken, refreshToken, role);
          this.authStateSubject.next(true);
        }
        this.googleAuthSubject.next(apiResponse);
      }),

      catchError((error: HttpErrorResponse) => {
        console.error('Google authentication failed:', error);
        this.googleAuthSubject.error(error);
        return throwError(() => error);
      })
    ).subscribe();
  }

  googleAuth(): Observable<any> {
    if (typeof google !== 'undefined' && google.accounts?.id) {
      google.accounts.id.prompt();
    } else {
      console.error('Google Identity Services SDK not available.');
    }
    return this.googleAuthSubject.asObservable();
  }

  // Core Auth
  login(data: AuthenticationRequestDto): Observable<HttpResponse<AuthenticationResponseDto>> {
    return this.http.post<AuthenticationResponseDto>(`${this.baseUrl}/authenticate`, data, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<AuthenticationResponseDto>) => {
          if (response.body?.accessToken) {
            this.saveTokens(response.body.accessToken!, response.body.refreshToken!, response.body.role);
            this.authStateSubject.next(true);
          }
        }),
        catchError(this.handleError('Login failed'))
      );
  }

  register(data: RegisterRequestDto): Observable<HttpResponse<AuthenticationResponseDto>> {
    return this.http.post<AuthenticationResponseDto>(`${this.baseUrl}/register`, data, {
      observe: 'response' as const
    }).pipe(
      tap((response: HttpResponse<AuthenticationResponseDto>) => {
        const accessToken = response.body?.accessToken;
        const refreshToken = response.body?.refreshToken;
        const role = response.body?.role;

        if(response.status === 200 && accessToken && refreshToken){
          this.saveTokens(accessToken, refreshToken, role);
          this.authStateSubject.next(true);
        }
      }),
      catchError(this.handleError('Registration failed'))
    );
  }

  logout(): Observable<any> {
    const token = this.getAccessToken();

    if (!token) {
      this.removeTokens();
      this.authStateSubject.next(false);
      this.redirectToLogin();
      return of({ message: 'Logged out locally.' });
    }

    return this.http.post(`${this.baseUrl}/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      tap(() => {
        this.removeTokens();
        this.authStateSubject.next(false);
        this.redirectToLogin();
      }),
      catchError((error: HttpErrorResponse) => {
        if ([401, 403].includes(error.status)) {
          this.removeTokens();
          this.authStateSubject.next(false);
          this.redirectToLogin();
          return of({ message: 'Forced local logout.' });
        }
        this.removeTokens();
        this.authStateSubject.next(false);
        this.redirectToLogin();
        return throwError(() => error);
      })
    );
  }

  private redirectToLogin(): void {
    const base = environment.authUrl || '';
    const normalized = base.replace(/\/+$/, '');
    const loginUrl = normalized.endsWith('/login') ? normalized : `${normalized}/login`;
    window.location.replace(loginUrl);
  }


  requestPasswordReset(email: string): Observable<void> {
    const payload: PasswordResetRequestDto = { email };
    return this.http.post<void>(`${this.baseUrl}/request-password-reset`, payload).pipe(
      tap(() => console.log('Password reset request sent')),
      catchError(this.handleError('Password reset request failed'))
    );
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    const payload: ResetPasswordRequestDto = {token, newPassword};
    return this.http.post<void>(`${this.baseUrl}/reset-password`, payload).pipe(
      tap(() => console.log('Password reset successful')),
      catchError(this.handleError('Password reset failed'))
    );
  }

  confirmCode(code: string): Observable<ConfirmationResponseDto> {
    const payload: CodeConfirmationRequestDto = { code };
    return this.http.post<ConfirmationResponseDto>(`${this.baseUrl}/confirm-code`, payload).pipe(
      catchError(this.handleError('Code confirmation failed'))
    );
  }

  // Token Management
  saveTokens(accessToken: string, refreshToken: string, role?: string): void {
    this.cookieService.set('accessToken', accessToken, 1);
    this.cookieService.set('refreshToken', refreshToken, 7);
    if (role) {
      this.cookieService.set('role', role, 7);
    }
  }

  getAccessToken(): string | null {
    return this.cookieService.get('accessToken');
  }

  getRefreshToken(): string | null {
    return this.cookieService.get('refreshToken');
  }

  getRole(): string | null {
    return this.cookieService.get('role');
  }

  refreshToken(token: string): Observable<AuthenticationResponseDto> {
    const payload: RefreshTokenRequestDto = {
      refreshToken: token
    };

    return this.http.post<AuthenticationResponseDto>(`${this.baseUrl}/refresh-token`, payload).pipe(
      tap((response: AuthenticationResponseDto) => {

        const newAccessToken = response.accessToken;
        const newRefreshToken = response.refreshToken;

        if (newAccessToken && newRefreshToken) {
          this.saveTokens(newAccessToken, newRefreshToken);
          this.authStateSubject.next(true);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.removeTokens();
        this.authStateSubject.next(false);
        this.redirectToLogin();
        return throwError(() => error);
      })
    );
  }

  removeTokens(): void {
    this.cookieService.delete('accessToken');
    this.cookieService.delete('refreshToken');
    this.cookieService.delete('role');
  }

  // Helpers
  private handleError(context: string) {
    return (error: HttpErrorResponse) => {
      console.error(`${context}:`, error);
      return throwError(() => error);
    };
  }
}
