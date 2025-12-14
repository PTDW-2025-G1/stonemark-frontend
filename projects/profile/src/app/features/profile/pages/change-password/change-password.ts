import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProfileService } from '@core/services/profile/profile.service';
import { PasswordContainerComponent } from '@shared/ui/password-container/password-container';
import { PasswordService } from '@shared/helpers/password.service';
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

  passwordStrength: 'weak' | 'medium' | 'strong' = 'weak';
  hasMinLength = false;
  hasUpperCase = false;
  hasLowerCase = false;
  hasNumber = false;
  hasSpecialChar = false;

  constructor(
    private passwordService: PasswordService,
    private profileService: ProfileService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.passwordService.createForm('change');
    this.passwordService.setupValidationListener(this.passwordForm, (reqs, strength) => {
      Object.assign(this, reqs);
      this.passwordStrength = strength;
    });
  }

  onSubmit(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { currentPassword, newPassword } = this.passwordForm.value;

    this.profileService.changePassword(currentPassword, newPassword).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.passwordService.showSuccessToast('Password changed successfully!');
        setTimeout(() => this.router.navigate(['/profile']), 2500);
      },
      error: err => {
        this.isSubmitting = false;
        this.passwordService.showErrorToast('Current password is incorrect');
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
