import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../../../../projects/shared/src/lib/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html'
})
export class ForgotPasswordComponent {
  loading = false;
  sent = false;

  form: FormGroup;
  codeForm: FormGroup;

  confirming = false;
  codeError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    const email = this.form.value.email as string;

    this.auth.requestPasswordReset(email).subscribe({
      next: () => {
        this.sent = true;
        this.loading = false;
        this.codeForm.reset();
        this.codeError = null;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onConfirmCode() {
    if (this.codeForm.invalid) return;
    this.confirming = true;
    this.codeError = null;

    const code = (this.codeForm.value.code as string).trim().toUpperCase();

    this.auth.confirmCode(code).subscribe({
      next: (res: { status: string; message?: string; token?: string }) => {
        const status = res?.status ?? 'ERROR';

        if (status === 'PASSWORD_RESET_REQUIRED' && res?.token) {
          this.router.navigate(['/reset-password'], { queryParams: { token: res.token } });
        } else if (status === 'SUCCESS') {
          this.router.navigate(['/verify'], { queryParams: { status: 'success' } });
        } else {
          this.codeError = res?.message || 'Invalid or expired code.';
        }

        this.confirming = false;
      },
      error: () => {
        this.codeError = 'Invalid or expired code.';
        this.confirming = false;
      }
    });
  }

  resend() {
    this.sent = false;
    this.onSubmit();
  }

  openEmail() {
    window.location.href = 'mailto:';
  }
}
