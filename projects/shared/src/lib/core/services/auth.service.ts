import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthFormData } from '../../../../../auth/src/app/features/auth/components/auth-form/auth-form';
import { environment } from '@env/environment';
import { CookieService } from './cookie.service';

declare const google: any;

export interface ConfirmationResponse {
  status: 'SUCCESS' | 'ERROR' | 'PASSWORD_RESET_REQUIRED';
  message?: string;
  token?: string;
}

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

    this.http.post(`${this.baseUrl}/google`, { token: response.credential }).pipe(
      tap((apiResponse: any) => {
        if (apiResponse?.accessToken && apiResponse?.refreshToken) {
          this.saveTokens(apiResponse.accessToken, apiResponse.refreshToken);
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

  // GitHub Auth
  githubAuth(): Observable<any> {
    console.log('Github authentication initiated');
    return of({ message: 'Github auth successful' }).pipe();
  }

  // Core Auth
  login(data: AuthFormData): Observable<HttpResponse<any>> {
    return this.http.post(`${this.baseUrl}/authenticate`, data, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          if (response.body?.accessToken) {
            this.saveTokens(response.body.accessToken, response.body.refreshToken);
            this.authStateSubject.next(true);
          }
        }),
        catchError(this.handleError('Login failed'))
      );
  }

  register(data: AuthFormData): Observable<HttpResponse<any>> {
    return this.http.post(`${this.baseUrl}/register`, data, {
      observe: 'response' as const
    }).pipe(
      tap((response: HttpResponse<any>) => {
        if(response.status == 200 && response.body?.accessToken){
          this.saveTokens(response.body.accessToken, response.body.refreshToken);
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
      return of({ message: 'Logged out locally.' });
    }

    return this.http.post(`${this.baseUrl}/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      tap(() => {
        this.removeTokens();
        this.authStateSubject.next(false);
      }),
      catchError((error: HttpErrorResponse) => {
        if ([401, 403].includes(error.status)) {
          this.removeTokens();
          this.authStateSubject.next(false);
          return of({ message: 'Forced local logout.' });
        }
        this.removeTokens();
        this.authStateSubject.next(false);
        return throwError(() => error);
      })
    );
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/request-password-reset`, { email }).pipe(
      tap(() => console.log('Password reset request sent')),
      catchError(this.handleError('Password reset request failed'))
    );
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { token, newPassword }).pipe(
      tap(() => console.log('Password reset successful')),
      catchError(this.handleError('Password reset failed'))
    );
  }

  confirmCode(code: string): Observable<ConfirmationResponse> {
    return this.http.post<ConfirmationResponse>(`${this.baseUrl}/confirm-code`, { code }).pipe(
      catchError(this.handleError('Code confirmation failed'))
    );
  }

  // Token Management
  saveTokens(accessToken: string, refreshToken: string): void {
    this.cookieService.set('accessToken', accessToken, 1);
    this.cookieService.set('refreshToken', refreshToken, 7);
  }

  getAccessToken(): string | null {
    return this.cookieService.get('accessToken');
  }

  getRefreshToken(): string | null {
    return this.cookieService.get('refreshToken');
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/refresh-token`, { refreshToken }).pipe(
      tap((response: any) => {
        this.saveTokens(response.accessToken, response.refreshToken);
        this.authStateSubject.next(true);
      }),
      catchError(this.handleError('Token refresh failed'))
    );
  }

  removeTokens(): void {
    this.cookieService.delete('accessToken');
    this.cookieService.delete('refreshToken');
  }

  // Helpers
  private handleError(context: string) {
    return (error: HttpErrorResponse) => {
      console.error(`${context}:`, error);
      return throwError(() => error);
    };
  }
}
