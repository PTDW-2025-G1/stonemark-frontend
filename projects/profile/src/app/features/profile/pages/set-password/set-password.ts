import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from '@core/services/account/account.service';
import { PasswordContainerComponent } from '@shared/ui/password-container/password-container';
import { PasswordFacade } from '@shared/facades/password.facade';
import { BreadcrumbProfileComponent } from '@shared/ui/breadcrumb-profile/breadcrumb-profile';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordContainerComponent,
    BreadcrumbProfileComponent
  ],
  templateUrl: './set-password.html',
})
export class SetPasswordComponent implements OnInit {

  passwordForm!: FormGroup;

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
    private passwordFacade: PasswordFacade,
    private profileService: AccountService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.passwordFacade.createForm('set');

    this.passwordFacade.setupValidationListener(
      this.passwordForm,
      (reqs, strength) => {
        Object.assign(this, reqs);
        this.passwordStrength = strength;
      }
    );
  }

  onSubmit(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { newPassword } = this.passwordForm.value;

    this.profileService.setPassword({ newPassword }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.passwordFacade.showSuccessToast('Password set successfully!');
        setTimeout(() => {
          this.router.navigate(['/profile/security']);
        }, 2000);
      },
      error: () => {
        this.isSubmitting = false;
        this.passwordFacade.showErrorToast('Failed to set password');
      }
    });

  }

  goBack(): void {
    this.location.back();
  }
}
