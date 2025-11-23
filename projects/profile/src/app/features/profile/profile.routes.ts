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
    path: 'change-email',
    loadComponent: () =>
      import('./pages/change-email/change-email').then(m => m.ChangeEmailComponent),
    title: 'Change Email'
  },
  {
    path: 'change-telephone',
    loadComponent: () =>
      import('./pages/change-telephone/change-telephone').then(m => m.ChangeTelephoneComponent),
    title: 'Change Telephone'
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('./pages/change-password/change-password').then(m => m.ChangePasswordComponent),
    title: 'Change Password'
  }

]
