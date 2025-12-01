import { Routes } from '@angular/router';
import {NotFoundComponent} from '@shared/ui/not-found/not-found.component'

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('projects/app/src/app/features/home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: 'about',
    loadChildren: () =>
      import('projects/app/src/app/features/about/about.routes').then(m => m.ABOUT_ROUTES)
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('projects/app/src/app/features/contact/contact.routes').then(m => m.CONTACT_ROUTES)
  },
  {
    path: 'help',
    loadChildren: () =>
      import('projects/app/src/app/features/help/help.routes').then(m => m.HELP_ROUTES)
  },
  {
    path: 'privacy-policy',
    loadChildren: () =>
      import('projects/app/src/app/features/privacy-policy/privacy-policy.routes').then(m => m.PRIVACY_POLICY_ROUTES)
  },
  {
    path: 'terms-service',
    loadChildren: () =>
      import('projects/app/src/app/features/terms-of-service/terms-of-service.routes').then(m => m.TERMS_OF_SERVICE_ROUTES)
  },
  {
    path: 'cookies-policy',
    loadChildren: () =>
      import('projects/app/src/app/features/cookies-policy/cookies-policy.routes').then(m => m.COOKIES_POLICY_ROUTES)
  },
  {
    path: 'accessibility',
    loadChildren: () =>
      import('projects/app/src/app/features/accessibility/accessibility.routes').then(m => m.ACCESSIBILITY_ROUTES)
  },
  {
    path: 'search',
    loadChildren: () =>
      import('projects/app/src/app/features/search/search.routes').then(m => m.SEARCH_ROUTES)
  },
  {
    path: 'monuments',
    loadChildren: () =>
      import('projects/app/src/app/features/monuments/monument.routes').then(m => m.MONUMENT_ROUTES)
  },
  {
    path: 'suggestions',
    loadChildren: () =>
      import('projects/app/src/app/features/suggest-correction/suggest-correction.routes').then(m => m.SUGGEST_CORRECTION_ROUTES)
  },
  {
    path: 'marks',
    loadChildren: () =>
      import('projects/app/src/app/features/marks/mark.routes').then(m => m.MARK_ROUTES)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
