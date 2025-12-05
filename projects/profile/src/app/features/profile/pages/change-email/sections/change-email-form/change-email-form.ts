import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '@core/services/profile/profile.service';
import { CodeConfirmationRequestDto } from '@api/model/code-confirmation-request-dto';
import {AuthService} from '@core/services/auth/auth.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-change-email-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './change-email-form.html'
})
export class ChangeEmailFormComponent implements OnInit {
  emailForm!: FormGroup;
  verificationForm!: FormGroup;

  currentEmail = '';
  newEmailPending = '';
  errorMessage = '';
  isSubmitting = false;

  currentStep: 'email' | 'verify-current' | 'verify-new' | 'success' = 'email';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      newEmail: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required]]
    }, { validators: this.emailMatchValidator });

    this.verificationForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });

    this.loadCurrentEmail();
  }

  emailMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newEmail = control.get('newEmail');
    const confirmEmail = control.get('confirmEmail');
    if (!newEmail || !confirmEmail) return null;
    return newEmail.value === confirmEmail.value ? null : { emailMismatch: true };
  }

  loadCurrentEmail(): void {
    this.profileService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentEmail = user.email || '';
      },
      error: (err) => {
        this.errorMessage = 'Failed to load current email';
        console.error(err);
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (this.emailForm.invalid) {
      Object.keys(this.emailForm.controls).forEach(key => {
        this.emailForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    try {
      this.newEmailPending = this.emailForm.get('newEmail')?.value;

      await this.profileService.changeEmail(this.newEmailPending).toPromise();

      this.currentStep = 'verify-current';
    } catch (error: any) {
      this.errorMessage = error.error?.message || 'Failed to initiate email change';
    } finally {
      this.isSubmitting = false;
    }
  }

  async onVerifyCurrentEmail(): Promise<void> {
    if (this.verificationForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    try {
      const code = this.verificationForm.get('code')?.value;

      const request: CodeConfirmationRequestDto = {
        code: code
      };

      await this.profileService.confirmCode(request).toPromise();

      this.verificationForm.reset();
      this.currentStep = 'verify-new';
    } catch (error: any) {
      this.errorMessage = error.error?.message || 'Invalid verification code for current email';
    } finally {
      this.isSubmitting = false;
    }
  }

  async onVerifyNewEmail(): Promise<void> {
    if (this.verificationForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    try {
      const code = this.verificationForm.get('code')?.value;
      const request: CodeConfirmationRequestDto = { code };
      await this.profileService.confirmCode(request).toPromise();
      this.currentStep = 'success';
      await this.authService.logout().toPromise();
    } catch (error: any) {
      this.errorMessage = error.error?.message || 'Invalid verification code for new email';
    } finally {
      this.isSubmitting = false;
    }
  }

  async resendCode(): Promise<void> {
    this.isSubmitting = true;
    this.errorMessage = '';

    try {
      await this.profileService.changeEmail(this.newEmailPending).toPromise();
    } catch (error: any) {
      this.errorMessage = error.error?.message || 'Failed to resend code';
    } finally {
      this.isSubmitting = false;
    }
  }

  onCancel(): void {
    if (this.currentStep === 'email') {
      this.router.navigate(['/profile']);
    } else {
      this.currentStep = 'email';
      this.emailForm.reset();
      this.verificationForm.reset();
      this.errorMessage = '';
      this.newEmailPending = '';
    }
  }
}
