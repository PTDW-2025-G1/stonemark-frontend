import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';
import { PasswordContainerComponent } from '@shared/ui/password-container/password-container';
import { PasswordService } from '@shared/helpers/password.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordContainerComponent],
  templateUrl: './reset-password.html'
})
export class ResetPasswordComponent implements OnInit {
  token: string | null = null;
  loading = false;
  passwordForm!: FormGroup;

  showNewPassword = false;
  showConfirmPassword = false;

  passwordStrength: 'weak' | 'medium' | 'strong' = 'weak';
  hasMinLength = false;
  hasUpperCase = false;
  hasLowerCase = false;
  hasNumber = false;
  hasSpecialChar = false;

  constructor(
    private passwordService: PasswordService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.passwordService.createForm('reset');
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.passwordService.setupValidationListener(this.passwordForm, (reqs, strength) => {
      Object.assign(this, reqs);
      this.passwordStrength = strength;
    });
  }

  onSubmit(): void {
    if (this.passwordForm.invalid || !this.token) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const newPassword = this.passwordForm.value.newPassword;

    this.auth.resetPassword(this.token, newPassword).subscribe({
      next: () => {
        this.loading = false;
        this.passwordService.showSuccessToast('Password reset successfully!');
        setTimeout(() => this.router.navigate(['/login']), 2500);
      },
      error: () => {
        this.loading = false;
        this.passwordService.showErrorToast('Something went wrong. Try again.');
      }
    });
  }
}
