import { Routes } from '@angular/router';
import {authGuard} from 'projects/shared/src/lib/core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () =>
      import('projects/profile/src/app/features/profile/profile.routes').then(m => m.PROFILE_ROUTES),
    canActivate: [authGuard]
  },
];
