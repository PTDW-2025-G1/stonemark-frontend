import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/search/search.routes').then(m => m.SEARCH_ROUTES)
  },
  {
    path: 'monuments',
    loadChildren: () =>
      import('./features/monuments/monument.routes').then(m => m.MONUMENT_ROUTES)
  }
];
