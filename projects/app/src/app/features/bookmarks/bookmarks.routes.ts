import {Routes} from '@angular/router';

export const BOOKMARKS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/bookmarks/bookmarks').then(m => m.BookmarksComponent),
    title: 'Bookmarks'
  }
];
