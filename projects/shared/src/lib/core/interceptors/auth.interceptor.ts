import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError, switchMap, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { environment } from '@env/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();
    const isApiRequest = req.url.startsWith(environment.apiUrl);

    const authReq = token && isApiRequest
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!isApiRequest) return throwError(() => error);

        if (error.status === 401 || error.status === 403) {
          const isAuthEndpoint = [
            '/auth/authenticate',
            '/auth/register',
            '/auth/google'
          ].some(path => req.url.includes(path));

          const isRefresh = req.url.includes('/auth/refresh-token');

          if (isAuthEndpoint || isRefresh) {
            this.handleAuthFailure();
            return throwError(() => error);
          }

          return this.handle401Error(authReq, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isRefreshing) {
      this.handleAuthFailure();
      return throwError(() => new Error('Unauthorized'));
    }

    this.isRefreshing = true;
    const refreshToken = this.authService.getRefreshToken();

    if (!refreshToken) {
      this.handleAuthFailure();
      return throwError(() => new Error('No refresh token'));
    }

    return this.authService.refreshToken(refreshToken).pipe(
      switchMap((response: any) => {
        this.isRefreshing = false;
        this.authService.saveTokens(response.accessToken, response.refreshToken);

        const newReq = req.clone({
          setHeaders: { Authorization: `Bearer ${response.accessToken}` }
        });
        return next.handle(newReq);
      }),
      catchError(err => {
        this.isRefreshing = false;
        this.handleAuthFailure();
        return throwError(() => err);
      })
    );
  }

  private handleAuthFailure(): void {
    this.authService.removeTokens();
    this.router.navigate(['/login']);
  }
}
