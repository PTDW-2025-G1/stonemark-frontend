import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { environment } from '@env/environment';

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

  if (auth.getAccessToken()) {
    if (auth.isStaff()) {
      window.location.href = environment.staffUrl;
    } else {
      window.location.href = environment.profileUrl;
    }
    return false;
  }

  return true;
};
