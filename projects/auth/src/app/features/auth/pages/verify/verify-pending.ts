import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../projects/shared/src/lib/core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-verify-pending',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-surface flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div>
        @if (!verified) {
          <!-- Verification Form -->
          <div>
            <!-- Header -->
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center w-20 h-20 bg-info/10 rounded-2xl mb-4">
                <i class="bi bi-envelope-check text-info text-4xl"></i>
              </div>
              <h2 class="text-3xl sm:text-4xl font-serif font-bold text-text mb-3">
                Verify Your Email
              </h2>
              <p class="text-text-muted mb-2">
                We sent a verification link to
              </p>
              <p class="text-primary font-semibold text-lg mb-4">
                {{ email }}
              </p>
              <p class="text-sm text-text-muted">
                Click the link in the email or enter your 6-character verification code below
              </p>
            </div>

            <!-- Main Card -->
            <div class="bg-gradient-to-br from-surface-alt to-surface rounded-2xl border-2 border-border p-6 sm:p-8 shadow-xl mb-6">

              <!-- Code Input Form -->
              <form [formGroup]="verifyForm" (ngSubmit)="onSubmit()">

                <div class="mb-6">
                  <label for="code" class="block text-sm font-semibold text-text mb-3 text-center">
                    Verification Code
                  </label>

                  <!-- Code Input -->
                  <input
                    type="text"
                    id="code"
                    formControlName="code"
                    maxlength="6"
                    placeholder="XXXXXX"
                    autocomplete="off"
                    class="w-full text-center text-2xl sm:text-3xl font-bold tracking-[0.5em] uppercase py-4 bg-surface border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-info/20 focus:border-info transition-all duration-300 placeholder:tracking-normal placeholder:text-base"
                    [class.border-error]="verifyForm.get('code')?.invalid && verifyForm.get('code')?.touched"
                  />

                  @if (verifyForm.get('code')?.invalid && verifyForm.get('code')?.touched) {
                    <p class="mt-3 text-sm text-error flex items-center justify-center gap-1">
                      <i class="bi bi-exclamation-circle"></i>
                      Please enter a valid 6-character code
                    </p>
                  }

                  <p class="mt-3 text-xs text-text-muted text-center">
                    The code is case-insensitive and expires in 10 minutes
                  </p>
                </div>

                <!-- Error Message -->
                @if (errorMessage) {
                  <div class="mb-6 p-4 bg-error/10 border border-error/30 rounded-xl flex items-start gap-3">
                    <i class="bi bi-exclamation-triangle-fill text-error text-xl"></i>
                    <div>
                      <p class="text-sm font-semibold text-error mb-1">Verification Failed</p>
                      <p class="text-xs text-text-muted">{{ errorMessage }}</p>
                    </div>
                  </div>
                }

                <!-- Submit Button -->
                <button
                  type="submit"
                  [disabled]="verifyForm.invalid || loading"
                  class="w-full group relative overflow-hidden px-6 py-3.5 bg-info text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none mb-3">
                  <div class="absolute inset-0 bg-gradient-to-r from-info/80 to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span class="relative flex items-center justify-center gap-2">
                @if (loading) {
                  <i class="bi bi-hourglass-split animate-spin"></i>
                  Verifying...
                } @else {
                  <i class="bi bi-check2-circle"></i>
                  Verify Code
                }
              </span>
                </button>
              </form>
            </div>

            <!-- Alternative Actions -->
            <div class="space-y-3">
              <!-- Open Email App -->
              <button
                (click)="openEmail()"
                class="w-full px-6 py-3 bg-surface-alt border-2 border-border text-text rounded-xl font-semibold hover:border-info transition-all duration-300 flex items-center justify-center gap-2">
                <i class="bi bi-envelope-open"></i>
                Open Email App
              </button>

              <!-- Back to Login -->
              <a
                routerLink="/login"
                class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-surface-alt border-2 border-border text-text rounded-xl font-semibold hover:border-primary transition-all duration-300">
                <i class="bi bi-arrow-left"></i>
                Back to Login
              </a>
            </div>

            <!-- Help Text -->
            <div class="mt-6 p-4 bg-info/5 rounded-xl border border-info/20">
              <div class="flex items-start gap-3">
                <i class="bi bi-info-circle text-info text-lg"></i>
                <div class="text-xs text-text-muted">
                  <p class="font-semibold text-text mb-1">Can't find the email?</p>
                  <ul class="space-y-1">
                    <li>• Check your spam or junk folder</li>
                    <li>• Make sure {{ email }} is correct</li>
                    <li>• Wait a few minutes and check again</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        }

        @if (verified) {
          <!-- Success State -->
          <div>
            <!-- Header -->
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center w-24 h-24 bg-success/10 rounded-2xl mb-4 animate-bounce">
                <i class="bi bi-check-circle text-success text-5xl"></i>
              </div>
              <h2 class="text-3xl sm:text-4xl font-serif font-bold text-text mb-2">
                Email Verified!
              </h2>
              <p class="text-text-muted">
                Your account has been successfully verified
              </p>
            </div>

            <!-- Success Card -->
            <div class="bg-gradient-to-br from-surface-alt to-surface rounded-2xl border-2 border-border p-6 sm:p-8 shadow-xl mb-6">

              <div class="space-y-6">
                <!-- Success Message -->
                <div class="flex items-start gap-4 p-4 bg-success/5 rounded-xl border border-success/20">
                  <div class="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i class="bi bi-shield-check text-success text-xl"></i>
                  </div>
                  <div>
                    <h3 class="font-semibold text-text mb-2">Welcome to Stone Mark!</h3>
                    <p class="text-sm text-text-muted">
                      You can now access all features and start documenting stonemason marks. You'll be redirected to login shortly.
                    </p>
                  </div>
                </div>

                <!-- Next Steps -->
                <div class="p-4 bg-surface rounded-xl border border-border">
                  <h4 class="font-semibold text-text text-sm mb-3 flex items-center gap-2">
                    <i class="bi bi-list-check text-primary"></i>
                    What's Next?
                  </h4>
                  <ul class="space-y-2 text-xs text-text-muted">
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check2 text-success mt-0.5"></i>
                      <span>Log in with your credentials</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check2 text-success mt-0.5"></i>
                      <span>Complete your profile</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <i class="bi bi-check2 text-success mt-0.5"></i>
                      <span>Start exploring monuments and marks</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            <!-- Login Button -->
            <a
              routerLink="/login"
              class="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              <i class="bi bi-box-arrow-in-right"></i>
              Go to Login
            </a>
          </div>
        }

      </div>

    </div>
  `
})
export class VerifyPendingComponent implements OnInit {
  email = '';
  verifyForm!: FormGroup;
  loading = false;
  verified = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '';

    this.verifyForm = this.fb.group({
      code: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern(/^[A-Za-z0-9]{6}$/)
      ]]
    });

    // Auto-uppercase the code
    this.verifyForm.get('code')?.valueChanges.subscribe(value => {
      if (value) {
        this.verifyForm.get('code')?.setValue(value.toUpperCase(), { emitEvent: false });
      }
    });
  }

  openEmail(): void {
    window.location.href = 'mailto:';
  }

  onSubmit(): void {
    if (this.verifyForm.invalid) {
      this.verifyForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const code = this.verifyForm.value.code.toUpperCase();

    this.authService.confirmCode(code).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.status === 'SUCCESS') {
          this.verified = true;

          // Auto-redirect to login after 3 seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.errorMessage = res.message || 'Invalid or expired verification code';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Verification failed. Please try again.';
      }
    });
  }
}
