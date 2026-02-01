import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AccountService } from '@core/services/account/account.service';
import { map, take } from 'rxjs/operators';

export const hasPasswordGuard: CanActivateFn = () => {
  const router = inject(Router);
  const profileService = inject(AccountService);

  // Get the current hasPassword state
  const hasPassword = profileService.getHasPassword();

  // If we already have the status cached
  if (hasPassword !== null) {
    if (!hasPassword) {
      // Redirect to set-password if no password is set
      router.navigate(['/profile/set-password']);
      return false;
    }
    return true;
  }

  // If we don't have the status yet, fetch it
  return profileService.getSecurityStatus().pipe(
    take(1),
    map(status => {
      if (!status.hasPassword) {
        // Redirect to set-password if no password is set
        router.navigate(['/profile/set-password']);
        return false;
      }
      return true;
    })
  );
};
