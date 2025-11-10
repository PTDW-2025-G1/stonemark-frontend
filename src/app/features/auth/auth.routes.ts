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
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password').then(m => m.ForgotPasswordComponent),
    title: 'Forgot Password'
  },
  {
    path: 'verify',
    loadComponent: () => import('./pages/verify/verify').then(m => m.VerifyComponent),
    title: 'Account Verification'
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password').then(m => m.ResetPasswordComponent),
    title: 'Reset Password'
  },
  {
    path: 'confirm',
    loadComponent: () => import('./pages/confirm/confirm').then(m => m.ConfirmComponent),
    title: 'Confirm Token'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
