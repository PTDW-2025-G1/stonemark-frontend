import {Routes} from '@angular/router';
import {NotFoundComponent} from '@shared/ui/not-found/not-found.component';

export const DISCOVER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./discover').then(m => m.DiscoverPageComponent),
    title: 'Stone Mark - Discover the Routes'
  },
  {
    path: 'repo/frontend',
    component: NotFoundComponent,
    canActivate: [() => { window.location.href = 'https://github.com/PTDW-2025-Group-1/stonemark-frontend'; return false; }]
  },
  {
    path: 'repo/backend',
    component: NotFoundComponent,
    canActivate: [() => { window.location.href = 'https://github.com/PTDW-2025-Group-1/stonemark-api'; return false; }]
  },

]
