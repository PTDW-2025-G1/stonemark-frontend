import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProfileService } from '@core/services/profile/profile.service';
import { PasswordContainerComponent } from '@shared/ui/password-container/password-container';
import { PasswordFacade } from '@shared/facades/password.facade';
import { BreadcrumbProfileComponent } from '@shared/ui/breadcrumb-profile/breadcrumb-profile';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordContainerComponent, BreadcrumbProfileComponent],
  templateUrl: './change-password.html',
})
export class ChangePasswordComponent implements OnInit {
  passwordForm!: FormGroup;

  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;
  submitError = false;
  errorMessage = '';

  passwordStrength: 'weak' | 'medium' | 'strong' = 'weak';
  hasMinLength = false;
  hasUpperCase = false;
  hasLowerCase = false;
  hasNumber = false;
  hasSpecialChar = false;

  constructor(
    private passwordFacade: PasswordFacade,
    private profileService: ProfileService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.passwordFacade.createForm('change');
    this.passwordFacade.setupValidationListener(this.passwordForm, (reqs, strength) => {
      Object.assign(this, reqs);
      this.passwordStrength = strength;
    });
  }

  onSubmit(): void {
    this.submitError = false;
    this.errorMessage = '';
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { currentPassword, newPassword } = this.passwordForm.value;

    this.profileService.changePassword(currentPassword, newPassword).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.passwordFacade.showSuccessToast('Password changed successfully!');
        setTimeout(() => this.router.navigate(['/profile']), 2500);
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 400 && err.error && typeof err.error === 'object') {
          const messages = Object.values(err.error);
          this.errorMessage = messages.join(' ');
          this.submitError = true;
          return;
        }
        if (err.status === 401 && err.error?.message) {
          this.errorMessage = err.error.message;
          this.submitError = true;
          return;
        }
        this.errorMessage = 'Something went wrong. Please try again later.';
        this.submitError = true;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
