import { Routes } from '@angular/router';

export const TERMS_OF_SERVICE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./terms-of-service').then(m => m.TermsOfService),
    title: 'Terms of Service'
  }
];
