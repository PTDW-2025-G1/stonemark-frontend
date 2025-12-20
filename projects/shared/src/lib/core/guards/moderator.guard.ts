import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

export const moderatorGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const role = auth.getRole();

  // Admin has access to all moderator pages
  if (role !== 'ADMIN' && role !== 'MODERATOR') {
    // Redirect to dashboard or show unauthorized page
    router.navigate(['/']);
    return false;
  }

  return true;
};

