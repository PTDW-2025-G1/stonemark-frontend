import {Routes} from '@angular/router';

export const MARK_ROUTES : Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('@features/marks/mark-detail/mark-detail').then(
        m => m.MarkDetailComponent),
  },
  {
    path: 'occurrence/:id',
    loadComponent: () =>
      import('@features/marks/mark-occurrence-detail/mark-occurrence-detail').then(
        m => m.MarkOccurrenceDetail),
  }
]
