import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthFormData } from '@features/auth/components/auth-form/auth-form';
import { Observable, of, Subject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// Declare google namespace for GIS SDK
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;
  private googleAuthSubject = new Subject<any>();

  constructor(private http: HttpClient) {
    this.loadGoogleGISSDK();
    console.log('AuthService baseUrl:', this.baseUrl);
  }

  private loadGoogleGISSDK(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.initializeGoogleGIS();
    };
    document.head.appendChild(script);
  }

  private initializeGoogleGIS(): void {
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: this.handleGoogleCredentialResponse.bind(this),
        auto_select: false, // Set to true if you want auto sign-in
        cancel_on_tap_outside: true,
      });
      console.log('Google Identity Services client initialized.');
    } else {
      console.error('Google Identity Services SDK not loaded.');
    }
  }

  private handleGoogleCredentialResponse(response: any): void {
    if (response.credential) {
      this.http.post(`${this.baseUrl}/google`, { token: response.credential }).pipe(
        tap((apiResponse: any) => {
          if (apiResponse && apiResponse.accessToken && apiResponse.refreshToken) {
            this.saveTokens(apiResponse.accessToken, apiResponse.refreshToken);
          }
          this.googleAuthSubject.next(apiResponse);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Google authentication failed on backend:', error);
          this.googleAuthSubject.error(error);
          return throwError(() => error);
        })
      ).subscribe();
    } else {
      console.error('No credential found in Google response.');
      this.googleAuthSubject.error('No credential found');
    }
  }

  login(data: AuthFormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate`, { email: data.email, password: data.password }).pipe(
      tap((response: any) => {
        if (response && response.accessToken && response.refreshToken) {
          this.saveTokens(response.accessToken, response.refreshToken);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  register(data: AuthFormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    }).pipe(
      tap((response: any) => {
        if (response && response.accessToken && response.refreshToken) {
          this.saveTokens(response.accessToken, response.refreshToken);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Registration failed:', error);
        return throwError(() => error);
      })
    );
  }

  googleAuth(): Observable<any> {
    console.log('Google authentication initiated via GIS prompt');
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      google.accounts.id.prompt(); // Display the One Tap / popup
    } else {
      console.error('Google Identity Services SDK not available to prompt.');
      // Optionally, try to reload or inform the user
    }
    return this.googleAuthSubject.asObservable();
  }

  githubAuth(): Observable<any> {
    console.log('Github authentication initiated');
    // Implement Github Sign-In logic here
    return of({ message: 'Github auth successful' }).pipe(); // Removed delay as it's not an API call
  }

  private saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  removeTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
