import {Routes} from '@angular/router';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/profile/pages/profile-main/profile').then(m => m.ProfileComponent),
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('@features/profile/pages/change-password/change-password').then(m => m.ChangePassword),
  }

]
