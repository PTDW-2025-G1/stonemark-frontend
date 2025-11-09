import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { ProfileService } from '@core/services/profile.service';
import {ChangePasswordHeaderComponent} from '@features/profile/pages/change-password/sections/change-password-header';
import {ChangePasswordFormComponent} from '@features/profile/pages/change-password/sections/change-password-form';
import {
  ChangePasswordMessagesComponent
} from '@features/profile/pages/change-password/sections/change-password-messages';
import {ChangePasswordHelpComponent} from '@features/profile/pages/change-password/sections/change-password-help';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ChangePasswordHeaderComponent, ChangePasswordFormComponent, ChangePasswordMessagesComponent, ChangePasswordHelpComponent],
  templateUrl: './change-password.html',
})
export class ChangePassword implements OnInit {
  passwordForm!: FormGroup;

  // Password visibility toggles
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  // Submit states
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';

  // Password strength
  passwordStrength: 'weak' | 'medium' | 'strong' = 'weak';

  // Password requirements checks
  hasMinLength = false;
  hasUpperCase = false;
  hasLowerCase = false;
  hasNumber = false;
  hasSpecialChar = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setupPasswordValidation();
  }

  private initializeForm(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  private setupPasswordValidation(): void {
    this.passwordForm.get('newPassword')?.valueChanges.subscribe(password => {
      if (password) {
        this.checkPasswordRequirements(password);
        this.calculatePasswordStrength(password);
      } else {
        this.resetPasswordRequirements();
      }
    });
  }

  private checkPasswordRequirements(password: string): void {
    this.hasMinLength = password.length >= 8;
    this.hasUpperCase = /[A-Z]/.test(password);
    this.hasLowerCase = /[a-z]/.test(password);
    this.hasNumber = /\d/.test(password);
    this.hasSpecialChar = /[@$!%*?&]/.test(password);
  }

  private resetPasswordRequirements(): void {
    this.hasMinLength = false;
    this.hasUpperCase = false;
    this.hasLowerCase = false;
    this.hasNumber = false;
    this.hasSpecialChar = false;
  }

  private calculatePasswordStrength(password: string): void {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    if (strength <= 2) {
      this.passwordStrength = 'weak';
    } else if (strength <= 4) {
      this.passwordStrength = 'medium';
    } else {
      this.passwordStrength = 'strong';
    }
  }

  private passwordMatchValidator(group: FormGroup): { passwordMismatch: boolean } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (confirmPassword && newPassword !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  toggleCurrentPassword(): void {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;
    this.errorMessage = '';

    const formData = {
      currentPassword: this.passwordForm.get('currentPassword')?.value,
      newPassword: this.passwordForm.get('newPassword')?.value
    };

    this.profileService.changePassword(
      formData.currentPassword,
      formData.newPassword
    ).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.passwordForm.reset();

        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 2000);
        },
      error: err => {
        this.isSubmitting = false;
        this.submitError = true;
        this.errorMessage = err.error.message;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
