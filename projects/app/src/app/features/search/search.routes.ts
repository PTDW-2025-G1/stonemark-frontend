import { Routes } from '@angular/router';

export const SEARCH_ROUTES: Routes = [
  {
    path: ':type',
    loadComponent: () =>
      import('./search').then(m => m.SearchComponent),
  }
];
