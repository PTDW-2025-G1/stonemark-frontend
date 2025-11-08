import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent),
    title: 'Login'
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent),
    title: 'Register'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
