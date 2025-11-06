import {Routes} from '@angular/router';

export const HELP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/help/help').then(m => m.HelpComponent),
  }
]
