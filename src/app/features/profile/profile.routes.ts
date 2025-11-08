import {Routes} from '@angular/router';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/profile/profile').then(m => m.ProfileComponent),
  }
]
