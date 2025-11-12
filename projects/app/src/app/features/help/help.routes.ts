import {Routes} from '@angular/router';

export const HELP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./help').then(m => m.HelpComponent),
    title: 'Help'
  }
]
