import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { environment } from '@core/environments/environment';

export const roleGuard: CanActivateFn = () => {
  const auth = inject(AuthService);

  const token = auth.getAccessToken();
  const role = auth.getRole();

  if (!token) {
    window.location.href = `${environment.authUrl}/login`;
    return false;
  }

  if (role !== 'ADMIN' && role !== 'MODERATOR') {
    window.location.href = environment.baseUrl;
    return false;
  }

  return true;
};
