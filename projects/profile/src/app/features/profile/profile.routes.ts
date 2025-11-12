import {Routes} from '@angular/router';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/profile-main/profile').then(m => m.ProfileComponent),
    title: 'Profile'
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('./pages/change-password/change-password').then(m => m.ChangePasswordComponent),
    title: 'Change Password'
  }

]
