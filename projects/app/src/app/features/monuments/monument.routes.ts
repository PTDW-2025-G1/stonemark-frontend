import {Routes} from '@angular/router';

export const MONUMENT_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./monument-detail/monument-detail').then(
        m => m.MonumentDetailComponent),
  },
  {
    path: ':id/occurrences',
    loadComponent: () =>
      import('./monument-occurrence/monument-occurrence').then(
        m => m.MonumentOccurrenceComponent),
  }
];
