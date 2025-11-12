import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PasswordUtils } from '../utils/password.utils';

@Injectable({ providedIn: 'root' })
export class PasswordService {
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}

  createForm(mode: 'change' | 'reset'): FormGroup {
    const controls: any = {
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
        ]
      ],
      confirmPassword: ['', Validators.required],
    };

    if (mode === 'change') {
      controls.currentPassword = ['', Validators.required];
    }

    const form = this.fb.group(controls, { validators: this.passwordMatchValidator });
    return form;
  }

  private passwordMatchValidator(group: FormGroup): { passwordMismatch: boolean } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword && confirmPassword && newPassword !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  }

  setupValidationListener(
    form: FormGroup,
    callback: (reqs: any, strength: 'weak' | 'medium' | 'strong') => void
  ): void {
    form.get('newPassword')?.valueChanges.subscribe(password => {
      if (!password) {
        callback(PasswordUtils.resetRequirements(), 'weak');
        return;
      }

      const reqs = PasswordUtils.checkRequirements(password);
      const strength = PasswordUtils.calculateStrength(password);
      callback(reqs, strength);
    });
  }

  showSuccessToast(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 2500,
      panelClass: ['bg-success', 'text-white', 'font-medium'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  showErrorToast(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      panelClass: ['bg-error', 'text-white', 'font-medium'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
}
