import { Routes } from '@angular/router';

export const COOKIES_POLICY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./cookies-policy').then(m => m.CookiesPolicyComponent),
    title: 'Cookies Policy'
  }
];
