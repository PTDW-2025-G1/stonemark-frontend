import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.html'
})
export class ResetPasswordComponent implements OnInit {
  loading = false;
  success = false;
  token: string | null = null;
  form: FormGroup;

  showPassword = false;

  // Password requirements checks
  hasMinLength = false;
  hasUpperCase = false;
  hasLowerCase = false;
  hasNumber = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.setupPasswordValidation();
  }

  private setupPasswordValidation(): void {
    this.form.get('newPassword')?.valueChanges.subscribe(password => {
      if (password) {
        this.checkPasswordRequirements(password);
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
  }

  private resetPasswordRequirements(): void {
    this.hasMinLength = false;
    this.hasUpperCase = false;
    this.hasLowerCase = false;
    this.hasNumber = false;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.form.invalid || !this.token) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.auth.resetPassword(this.token, this.form.value.newPassword!).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 2500);
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
