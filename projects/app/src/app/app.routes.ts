import { Routes } from '@angular/router';
import {authGuard} from 'projects/shared/src/lib/core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('projects/app/src/app/features/home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: 'about',
    loadChildren: () =>
      import('projects/app/src/app/features/about/about.routes').then(m => m.ABOUT_ROUTES)
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('projects/app/src/app/features/contact/contact.routes').then(m => m.CONTACT_ROUTES)
  },
  {
    path: 'help',
    loadChildren: () =>
      import('projects/app/src/app/features/help/help.routes').then(m => m.HELP_ROUTES)
  },
  {
    path: 'privacy-policy',
    loadChildren: () =>
      import('projects/app/src/app/features/privacy-policy/privacy-policy.routes')
        .then(m => m.PRIVACY_POLICY_ROUTES)
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('projects/profile/src/app/features/profile/profile.routes').then(m => m.PROFILE_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('projects/app/src/app/features/search/search.routes').then(m => m.SEARCH_ROUTES)
  },
  {
    path: 'monuments',
    loadChildren: () =>
      import('projects/app/src/app/features/monuments/monument.routes').then(m => m.MONUMENT_ROUTES)
  }
];
