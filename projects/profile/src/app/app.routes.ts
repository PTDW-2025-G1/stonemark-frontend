import { Routes } from '@angular/router';
import {authGuard} from 'projects/shared/src/lib/core/guards/auth.guard';
import {NotFoundComponent} from '@shared/ui/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () =>
      import('projects/profile/src/app/features/profile/profile.routes').then(m => m.PROFILE_ROUTES),
      canActivate: [authGuard]
  },
  {
    path: 'bookmarks',
    loadChildren: () =>
      import('projects/profile/src/app/features/bookmarks/bookmarks.routes').then(m => m.BOOKMARKS_ROUTES),
      canActivate: [authGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
