import {Routes} from '@angular/router';

export const DISCOVER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./discover').then(m => m.DiscoverPageComponent),
    title: 'Stone Mark - Discover the Routes'
  }
]
