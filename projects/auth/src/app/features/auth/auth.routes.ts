import { Routes } from '@angular/router';
import { loginGuard } from '@core/guards/auth.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent),
    canActivate: [loginGuard],
    title: 'Login'
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent),
    canActivate: [loginGuard],
    title: 'Register'
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password').then(m => m.ForgotPasswordComponent),
    canActivate: [loginGuard],
    title: 'Forgot Password'
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password').then(m => m.ResetPasswordComponent),
    canActivate: [loginGuard],
    title: 'Reset Password'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
