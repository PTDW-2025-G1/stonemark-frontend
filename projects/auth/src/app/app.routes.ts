import { Routes } from '@angular/router';
import { loginGuard } from '@core/guards/auth.guard';
import {NotFoundComponent} from '@shared/ui/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('projects/auth/src/app/features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
