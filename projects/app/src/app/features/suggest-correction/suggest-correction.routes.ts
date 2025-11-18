import { Routes } from '@angular/router';

export const SUGGEST_CORRECTION_ROUTES: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./suggest-correction').then(
        c => c.SuggestCorrectionComponent
      )
  }
];
