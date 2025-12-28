import {Routes} from '@angular/router';

export const CONTRIBUTE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./contribute').then(m => m.ContributeComponent),
    title: 'Help'
  }
]
