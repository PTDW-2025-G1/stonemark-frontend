import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { ProfileService } from '@core/services/profile/profile.service';
import { TelephoneChangeRequestDto } from '@api/model/telephone-change-request-dto';
import { CodeConfirmationRequestDto } from '@api/model/code-confirmation-request-dto';

type Step = 'telephone' | 'verify-current' | 'verify-new' | 'success';

@Component({
  selector: 'app-change-telephone-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './change-telephone-form.html'
})
export class ChangeTelephoneFormComponent implements OnInit {
  currentTelephone: string = '';
  newTelephone: string = '';
  currentStep: Step = 'telephone';
  telephoneForm!: FormGroup;
  codeForm!: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.loadCurrentTelephone();

    this.telephoneForm = this.fb.group({
      newTelephone: ['', [Validators.required, Validators.pattern(/^\+351\d{9}$/)]],
      confirmTelephone: ['', [Validators.required]]
    }, { validators: this.telephoneMatchValidator });

    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{6}$/)]]
    });
  }

  private loadCurrentTelephone(): void {
    this.profileService.getCurrentUser()
      .pipe(take(1))
      .subscribe({
        next: (profile: any) => {
          this.currentTelephone = profile?.telephone || profile?.phone || '';
        },
        error: () => {
          this.currentTelephone = '';
        }
      });
  }

  telephoneMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newTelephone = control.get('newTelephone');
    const confirmTelephone = control.get('confirmTelephone');
    if (!newTelephone || !confirmTelephone) return null;
    return newTelephone.value === confirmTelephone.value ? null : { telephoneMismatch: true };
  }

  onSubmit(): void {
    if (this.telephoneForm.invalid) {
      Object.keys(this.telephoneForm.controls).forEach(key => {
        this.telephoneForm.get(key)?.markAsTouched();
      });
      return;
    }

    const newTelephone = this.telephoneForm.get('newTelephone')?.value;

    if (newTelephone === this.currentTelephone) {
      this.errorMessage = 'The new telephone number must be different from the current one.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.newTelephone = newTelephone;

    const request: TelephoneChangeRequestDto = { newTelephone };

    this.profileService.requestTelephoneChange(request)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: () => {
          this.currentStep = 'verify-current';
          this.codeForm.reset();
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || err?.message || 'Failed to send verification code';
        }
      });
  }

  onSubmitCode(): void {
    if (this.codeForm.invalid) {
      this.codeForm.get('code')?.markAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const code = this.codeForm.get('code')?.value;
    const request: CodeConfirmationRequestDto = { code };

    this.profileService.confirmCode(request)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: () => {
          if (this.currentStep === 'verify-current') {
            this.currentStep = 'verify-new';
            this.codeForm.reset();
          } else if (this.currentStep === 'verify-new') {
            this.currentStep = 'success';
            setTimeout(() => this.router.navigate(['/profile']), 2000);
          }
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || err?.message || 'Invalid or expired code';
        }
      });
  }

  onCancel(): void {
    this.router.navigate(['/profile']);
  }
}
