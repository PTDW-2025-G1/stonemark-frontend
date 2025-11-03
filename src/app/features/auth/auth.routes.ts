import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent),
    title: 'Login - StoneMark'
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.SignupComponent),
    title: 'Register - StoneMark'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
