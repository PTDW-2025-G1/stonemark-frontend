import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import {ForgotPasswordRequestComponent} from './sections/forgot-password-request/forgot-password-request';
import {ForgotPasswordConfirmComponent} from './sections/forgot-password-confirm/forgot-password-confirm';
import {ConfirmationResponseDto} from '@api/model/confirmation-response-dto';
import StatusEnum = ConfirmationResponseDto.StatusEnum;

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ForgotPasswordRequestComponent, ForgotPasswordConfirmComponent],
  templateUrl: './forgot-password.html'
})
export class ForgotPasswordComponent {
  loading = false;
  sent = false;

  form: FormGroup;
  codeForm: FormGroup;

  confirming = false;
  emailError: string | null = null;
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
    this.emailError = null;
    const email = this.form.value.email as string;

    this.auth.requestPasswordReset(email).subscribe({
      next: () => {
        this.sent = true;
        this.loading = false;
        this.codeForm.reset();
        this.codeError = null;
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.error;
        if (typeof msg === 'string' && msg.toLowerCase().includes('user not found')) {
          this.emailError = 'Email not found. Please try again.';
        } else if (msg) {
          this.emailError = msg;
        } else {
          this.emailError = 'Unexpected error.';
        }
      }
    });
  }

  onConfirmCode(): void {
    if (this.codeForm.invalid) return;
    this.confirming = true;
    this.codeError = null;

    const code = (this.codeForm.value.code as string).trim().toUpperCase();

    this.auth.confirmCode(code).subscribe({
      next: (res: ConfirmationResponseDto) => {
        const status = res?.status ?? StatusEnum.Error;
        if (status === StatusEnum.PasswordResetRequired && res?.token) {
          this.router.navigate(['/reset-password'], { queryParams: { token: res.token } });
        } else if (status === StatusEnum.Success) {
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
