import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html'
})
export class ForgotPasswordComponent {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      contact: ['', [Validators.required]]
    });
  }

  submit(): void {
    if (this.form.invalid || this.loading) return;

    this.loading = true;

    const contactValue = this.form.value.contact as string;

    this.auth.requestPasswordReset(contactValue).subscribe({
      next: () => {
        // 🔐 nunca revelar se existe ou não
        this.submitted = true;
        this.loading = false;
      },
      error: () => {
        // 🔐 comportamento idêntico por segurança
        this.submitted = true;
        this.loading = false;
      }
    });
  }
}
