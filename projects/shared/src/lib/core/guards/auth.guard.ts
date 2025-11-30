import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { environment } from '@core/environments/environment';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getAccessToken();

  if (!token) {
    auth.removeTokens();
    router.navigate(['/login']);
    return false;
  }

  return true;
};

export const loginGuard: CanActivateFn = () => {
  const auth = inject(AuthService);

  const token = auth.getAccessToken();
  const role = auth.getRole();

  if (token) {
    if (role === 'ADMIN' || role === 'MODERATOR') {
      window.location.href = environment.staffUrl;
    } else {
      window.location.href = environment.baseUrl;
    }
    return false;
  }

  return true;
};

