import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordUtils } from '@shared/utils/password.utils';
import {NotificationService} from '@core/services/notification.service';

@Injectable({ providedIn: 'root' })
export class PasswordFacade {
  constructor(private fb: FormBuilder, private notificationService: NotificationService) {}

  createForm(mode: 'change' | 'reset' | 'set'): FormGroup {
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

    return this.fb.group(controls, { validators: this.passwordMatchValidator });
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
    this.notificationService.showSuccess(message);
  }

  showErrorToast(message: string): void {
    this.notificationService.showError(message);
  }
}
