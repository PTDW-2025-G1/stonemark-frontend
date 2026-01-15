import {Routes} from '@angular/router';

export const MARK_ROUTES : Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('@features/marks/mark-detail/mark-detail').then(
        m => m.MarkDetailComponent),
  },
  {
    path: ':id/map',
    loadComponent: () =>
      import('@features/marks/mark-occurrences-map/mark-occurrences-map').then(
        m => m.MarkOccurrencesMap),
  },
  {
    path: 'occurrence/:id',
    loadComponent: () =>
      import('@features/marks/mark-occurrence-detail/mark-occurrence-detail').then(
        m => m.MarkOccurrenceDetail),
  }
]
