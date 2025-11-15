import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="min-h-screen flex flex-col items-center justify-center text-center px-6">
      @if (!loading) {
        <div class="space-y-6">
          <h1 class="text-3xl font-bold text-primary">{{ title }}</h1>
          <p class="text-text-muted">{{ message }}</p>

          @if (redirectUrl) {
            <a [routerLink]="redirectUrl"
               class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all">
              Continue
            </a>
          }
        </div>
      }
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
    this.route.queryParamMap.subscribe(params => {
      const token = params.get('token');
      if (!token) {
        this.title = 'Invalid link';
        this.message = 'No token was provided.';
        this.loading = false;
        return;
      }

      this.http.get(`${environment.apiUrl}/auth/confirm?token=${token}`).subscribe({
        next: (res: any) => {
          console.log('Response:', res);

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
    });
  }
}
