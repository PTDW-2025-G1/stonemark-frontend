import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div *ngIf="loading" class="animate-pulse text-text-muted text-lg">
        Verifying your request...
      </div>

      <div *ngIf="!loading && message" class="max-w-md">
        <h1 class="text-2xl font-bold text-primary mb-4">{{ title }}</h1>
        <p class="text-text-muted mb-8">{{ message }}</p>

        <a *ngIf="redirectUrl"
           [routerLink]="redirectUrl"
           class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all">
          Continue
        </a>
      </div>
    </section>
  `
})
export class ConfirmComponent implements OnInit {
  loading = true;
  title = 'Please wait...';
  message = '';
  redirectUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.title = 'Invalid link';
      this.message = 'No token was provided.';
      this.loading = false;
      return;
    }

    this.http.get(`${environment.apiUrl}/auth/confirm?token=${token}`).subscribe({
      next: (res: any) => {
        this.loading = false;

        switch (res.status) {
          case 'SUCCESS':
            this.title = 'Account Verified!';
            this.message = 'Your account is now active. You can log in.';
            this.redirectUrl = '/login';
            break;

          case 'PASSWORD_RESET_REQUIRED':
            this.title = 'Password Reset Required';
            this.message = 'Please set a new password to continue.';
            setTimeout(() => {
              this.router.navigate(['/reset-password'], {
                queryParams: { token: res.token }
              });
            }, 1000);
            break;

          case 'ERROR':
          default:
            this.title = 'Invalid or Expired Link';
            this.message = res.message || 'Please request a new link.';
            this.redirectUrl = '/forgot-password';
            break;
        }
      },
      error: (err) => {
        this.loading = false;
        this.title = 'Verification Failed';
        this.message = err.error?.message || 'Something went wrong.';
      }
    });
  }
}
