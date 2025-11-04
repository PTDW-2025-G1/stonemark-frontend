import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthFormComponent, AuthFormData } from '@features/auth/components/auth-form/auth-form';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, AuthFormComponent],
  template: `
      <app-auth-form
        mode="register"
        [loading]="loading"
        (submit)="onSubmit($event)"
        (toggleMode)="onToggleMode()"
        (googleAuth)="onGoogleAuth()"
        (githubAuth)="onGithubAuth()"
      />
  `
})
export class SignupComponent {
  loading = false;

  constructor(private router: Router) {}

  onSubmit(data: AuthFormData): void {
    this.loading = true;
    console.log('Sign up data:', data);

    // Simulate API call
    setTimeout(() => {
      this.loading = false;
      // Handle signup logic here
      // this.router.navigate(['/dashboard']);
    }, 2000);
  }

  onToggleMode(): void {
    this.router.navigate(['/login'])
      .then(success => {
        if (success) {
          // successfull navigation
        } else {
          // failed navigation
        }
      })
      .catch(error => {
        // Trate o erro de navegação aqui
        console.error('Erro ao navegar:', error);
      });
  }


  onGoogleAuth(): void {
    console.log('Google auth');
    // Handle Google authentication
  }

  onGithubAuth(): void {
    console.log('Github auth');
    // Handle Github authentication
  }
}
