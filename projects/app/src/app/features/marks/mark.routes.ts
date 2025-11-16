import {Routes} from '@angular/router';

export const MARK_ROUTES : Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./mark-detail/mark-detail').then(
        m => m.MarkDetailComponent),
  }
]
