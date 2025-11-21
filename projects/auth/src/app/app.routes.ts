import { Routes } from '@angular/router';
import { loginGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [loginGuard],
    loadChildren: () =>
      import('projects/auth/src/app/features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
];
