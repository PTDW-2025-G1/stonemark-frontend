import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { ProfileService } from 'projects/shared/src/lib/core/services/profile.service';

@Component({
  selector: 'app-change-email',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './change-email.html'
})
export class ChangeEmailComponent implements OnInit {
  emailForm!: FormGroup;
  currentEmail: string = '';
  newEmail: string = '';
  emailChanged: boolean = false;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCurrentEmail();
  }

  private loadCurrentEmail(): void {
    this.profileService.getCurrentUser()
      .pipe(take(1))
      .subscribe({
        next: (profile: any) => {
          this.currentEmail = profile?.email || '';
        },
        error: () => {
          this.currentEmail = '';
        }
      });
  }

  initializeForm(): void {
    this.emailForm = this.fb.group({
      newEmail: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required]]
    }, {
      validators: this.emailMatchValidator
    });
  }

  emailMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newEmail = control.get('newEmail');
    const confirmEmail = control.get('confirmEmail');

    if (!newEmail || !confirmEmail) {
      return null;
    }

    return newEmail.value === confirmEmail.value ? null : { emailMismatch: true };
  }

  onSubmit(): void {
    if (this.emailForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const newEmailValue = this.emailForm.get('newEmail')?.value;

      if (newEmailValue === this.currentEmail) {
        this.errorMessage = 'The new email must be different from your current email';
        this.isSubmitting = false;
        return;
      }

      this.profileService.changeEmail(newEmailValue)
        .pipe(finalize(() => this.isSubmitting = false))
        .subscribe({
          next: () => {
            this.newEmail = newEmailValue;
            this.emailChanged = true;
          },
          error: (err) => {
            this.errorMessage = err?.error?.message || err?.message || 'An error occurred while changing your email';
          }
        });

    } else {
      Object.keys(this.emailForm.controls).forEach(key => {
        this.emailForm.get(key)?.markAsTouched();
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }

  openEmail(): void {
    window.location.href = 'mailto:';
  }
}
