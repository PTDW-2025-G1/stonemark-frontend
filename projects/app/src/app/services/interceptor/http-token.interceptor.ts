import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { KeycloakService } from '../keycloak/keycloak.service';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this.keycloakService.keycloak.updateToken(70)).pipe(
      mergeMap(() => {
        if (this.keycloakService.keycloak.token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${this.keycloakService.keycloak.token}`
            }
          });
        }
        return next.handle(request);
      })
    );
  }
}
