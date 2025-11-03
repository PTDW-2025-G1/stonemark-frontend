import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthFormComponent, AuthFormData} from '@features/auth/components/auth-form/auth-form';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AuthFormComponent],
  template: `
      <app-auth-form
        mode="login"
        [loading]="loading"
        (submit)="onSubmit($event)"
        (toggleMode)="onToggleMode()"
        (googleAuth)="onGoogleAuth()"
        (githubAuth)="onGithubAuth()"
      />
  `
})
export class LoginComponent {
  loading = false;

  constructor(private router: Router) {}

  onSubmit(data: AuthFormData): void {
    this.loading = true;
    console.log('Login data:', data);

    // Simulate API call
    setTimeout(() => {
      this.loading = false;
      // Handle login logic here
      // this.router.navigate(['/dashboard']);
    }, 2000);
  }

  onToggleMode(): void {
    this.router.navigate(['/register']);
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
