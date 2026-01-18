import {Routes} from '@angular/router';
import { hasPasswordGuard } from '@core/guards/has-password.guard';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/profile-main/profile').then(m => m.ProfileComponent),
    title: 'Profile'
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./pages/edit-profile/edit-profile').then(m => m.EditProfileComponent),
    title: 'Edit Profile'
  },
  {
    path: 'change-password',
    canActivate: [hasPasswordGuard],
    loadComponent: () =>
      import('./pages/change-password/change-password').then(m => m.ChangePasswordComponent),
    title: 'Change Password'
  },
  {
    path: 'set-password',
    loadComponent: () =>
      import('./pages/set-password/set-password').then(m => m.SetPasswordComponent),
    title: 'Set Password'
  },
  {
    path: 'security',
    loadComponent: () =>
      import('./pages/security/account-security').then(m => m.AccountSecurityComponent),
    title: 'Security'
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./pages/contacts/account-contacts').then(m => m.AccountContactsComponent),
    title: 'Contacts'
  },
  {
    path: 'social',
    loadComponent: () =>
      import('./pages/social/account-social').then(m => m.AccountSocialComponent),
    title: 'Social'
  }

]
