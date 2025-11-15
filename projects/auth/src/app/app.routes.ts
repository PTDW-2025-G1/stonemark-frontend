import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('projects/auth/src/app/features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
];
