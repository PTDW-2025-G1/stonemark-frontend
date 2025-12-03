import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { environment } from '@core/environments/environment';
import { KeycloakService } from '../keycloak/keycloak.service'; // Import the shared KeycloakService

export const roleGuard: CanActivateFn = () => {
  const keycloakService = inject(KeycloakService);

  const token = keycloakService.keycloak.token;
  // Access roles from keycloak.realmAccess or keycloak.resourceAccess
  // For simplicity, assuming realmAccess for now. Adjust if your Keycloak setup uses resourceAccess.
  const roles = keycloakService.keycloak.realmAccess?.roles || [];

  if (!token) {
    // If no token, redirect to login via Keycloak
    keycloakService.login(); // Use KeycloakService to initiate login
    return false;
  }

  // Check if the user has 'ADMIN' or 'MODERATOR' role
  if (!roles.includes('ADMIN') && !roles.includes('MODERATOR')) {
    window.location.href = environment.baseUrl; // Redirect to base URL if not authorized
    return false;
  }

  return true;
};
