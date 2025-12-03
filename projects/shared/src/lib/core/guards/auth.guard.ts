import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {KeycloakService} from '@core/keycloak/keycloak.service';

export const authGuard: CanActivateFn = (route, state) => {
  const keycloakService = inject(KeycloakService);

  if (keycloakService.keycloak.authenticated) {
    return true;
  }

  // If not authenticated, initiate Keycloak login flow
  keycloakService.login();
  return false;
};
