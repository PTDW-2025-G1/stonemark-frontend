import { Routes } from '@angular/router';

export const SEARCH_ROUTES: Routes = [
  {
    path: ':type',
    loadComponent: () =>
      import('@features/search/search').then(m => m.SearchComponent),
  }
];
