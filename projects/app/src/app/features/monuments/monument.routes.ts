import {Routes} from '@angular/router';

export const MONUMENT_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./monument-detail/monument-detail').then(
        m => m.MonumentDetailComponent),
  },
  {
    path: ':id/marks',
    loadComponent: () =>
      import('@features/monuments/monument-marks/monument-marks').then(
        m => m.MonumentMarksComponent),
  }
];
