import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home').then(m => m.HomeComponent),
    title: 'Home - StoneMark'
  }
];
