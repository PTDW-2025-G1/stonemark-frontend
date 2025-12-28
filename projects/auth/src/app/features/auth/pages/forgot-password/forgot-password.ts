import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { ConfirmationResponseDto } from '@api/model/confirmation-response-dto';
import { ButtonComponent } from '@shared/ui/button/button';

function emailOrPhoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+351\d{9}$/;
  if (!value) return null;
  if (emailRegex.test(value) || phoneRegex.test(value)) {
    return null;
  }
  return { emailOrPhone: true };
}

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './forgot-password.html'
})
export class ForgotPasswordComponent {

  form: FormGroup;
  codeForm: FormGroup;

  loading = false;
  verifying = false;
  submitted = false;

  codeError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      contact: ['', [Validators.required, emailOrPhoneValidator]]
    });

    this.codeForm = this.fb.group({
      code: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ]]
    });
  }

  submit(): void {
    if (this.form.invalid || this.loading) return;

    this.loading = true;
    const contactValue = this.form.value.contact as string;

    this.auth.requestPasswordReset(contactValue).subscribe({
      next: () => {
        this.submitted = true;
        this.loading = false;
        this.codeError = null;
        this.codeForm.reset();
      },
      error: () => {
        this.submitted = true;
        this.loading = false;
        this.codeError = null;
        this.codeForm.reset();
      }
    });
  }

  confirmCode(): void {
    if (this.codeForm.invalid || this.verifying) return;

    this.verifying = true;
    this.codeError = null;

    const code = (this.codeForm.value.code as string).trim().toUpperCase();

    this.auth.confirmCode(code).subscribe({
      next: (res: ConfirmationResponseDto) => {
        if (res?.token) {
          this.router.navigate(['/reset-password'], {
            queryParams: { token: res.token }
          });
        } else {
          this.codeError = 'Invalid or expired code.';
        }
        this.verifying = false;
      },
      error: () => {
        this.codeError = 'Invalid or expired code.';
        this.verifying = false;
      }
    });
  }
}
