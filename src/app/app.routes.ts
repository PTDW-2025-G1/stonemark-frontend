import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./features/about/about.routes').then(m => m.ABOUT_ROUTES)
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./features/contact/contact.routes').then(m => m.CONTACT_ROUTES)
  },
  {
    path: 'help',
    loadChildren: () =>
      import('./features/help/help.routes').then(m => m.HELP_ROUTES)
  },
  {
    path: 'bookmarks',
    loadChildren: () =>
      import('./features/bookmarks/bookmarks.routes').then(m => m.BOOKMARKS_ROUTES)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/search/search.routes').then(m => m.SEARCH_ROUTES)
  },
  {
    path: 'monuments',
    loadChildren: () =>
      import('./features/monuments/monument.routes').then(m => m.MONUMENT_ROUTES)
  },
];
