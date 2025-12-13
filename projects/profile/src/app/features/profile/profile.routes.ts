import {Routes} from '@angular/router';

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
    loadComponent: () =>
      import('./pages/change-password/change-password').then(m => m.ChangePasswordComponent),
    title: 'Change Password'
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
  }

]
