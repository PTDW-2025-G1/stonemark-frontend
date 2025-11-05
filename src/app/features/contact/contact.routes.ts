import {Routes} from '@angular/router';

export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/contact/contact').then(m => m.ContactComponent),
    title: 'Contact'
  }
];

