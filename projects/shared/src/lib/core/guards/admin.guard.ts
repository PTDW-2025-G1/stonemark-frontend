import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const role = auth.getRole();

  if (role !== 'ADMIN') {
    // Redirect to dashboard or show unauthorized page
    router.navigate(['/']);
    return false;
  }

  return true;
};

