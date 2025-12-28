import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from '@shared/ui/button/button';

@Component({
  selector: 'app-password-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  template: `
    <div class="bg-gradient-to-br from-surface-alt to-surface rounded-2xl border-2 border-border p-6 sm:p-8 shadow-xl">
      <form [formGroup]="passwordForm" (ngSubmit)="onSubmit.emit()">

        <!-- Current Password (only for change) -->
        @if (mode === 'change') {
          <div class="mb-6">
            <label class="block text-sm font-semibold text-text mb-2">
              Current Password <span class="text-error">*</span>
            </label>

            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i class="bi bi-lock text-text-muted"></i>
              </div>

              <input
                [type]="showCurrentPassword ? 'text' : 'password'"
                formControlName="currentPassword"
                placeholder="Enter current password"
                class="w-full pl-11 pr-12 py-3 bg-surface border-2 border-border rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                       transition-all duration-300"
                [class.border-error]="passwordForm.get('currentPassword')?.invalid
                                      && passwordForm.get('currentPassword')?.touched"
              />

              <button
                type="button"
                (click)="toggleCurrentPassword.emit()"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text cursor-pointer">
                <i [class]="showCurrentPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>

            @if (passwordForm.get('currentPassword')?.invalid
            && passwordForm.get('currentPassword')?.touched) {
              <p class="mt-2 text-sm text-error flex items-center gap-1">
                <i class="bi bi-exclamation-circle"></i>
                Current password is required
              </p>
            }
          </div>
        }

        <!-- New Password -->
        <div class="mb-6">
          <label class="block text-sm font-semibold text-text mb-2">
            {{ mode === 'change' ? 'New Password' : 'Password' }}
            <span class="text-error">*</span>
          </label>

          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i class="bi bi-key text-text-muted"></i>
            </div>

            <input
              [type]="showNewPassword ? 'text' : 'password'"
              formControlName="newPassword"
              placeholder="Enter password"
              class="w-full pl-11 pr-12 py-3 bg-surface border-2 border-border rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                     transition-all duration-300"
              [class.border-error]="passwordForm.get('newPassword')?.invalid
                                    && passwordForm.get('newPassword')?.touched"
            />

            <button
              type="button"
              (click)="toggleNewPassword.emit()"
              class="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text cursor-pointer">
              <i [class]="showNewPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>

          @if (passwordForm.get('newPassword')?.invalid
          && passwordForm.get('newPassword')?.touched) {
            <p class="mt-2 text-sm text-error flex items-center gap-1">
              <i class="bi bi-exclamation-circle"></i>
              @if (passwordForm.get('newPassword')?.errors?.['required']) {
                Password is required
              }
              @if (passwordForm.get('newPassword')?.errors?.['minlength']) {
                Must be at least 8 characters
              }
              @if (passwordForm.get('newPassword')?.errors?.['pattern']) {
                Must contain uppercase, lowercase, number and special character
              }
            </p>
          }

          <!-- Strength -->
          @if (passwordForm.get('newPassword')?.value) {
            <div class="mt-3">
              <div class="flex justify-between mb-2">
                <span class="text-xs font-semibold text-text-muted">Password Strength</span>
                <span
                  class="text-xs font-semibold"
                  [class.text-error]="passwordStrength === 'weak'"
                  [class.text-warning]="passwordStrength === 'medium'"
                  [class.text-success]="passwordStrength === 'strong'">
                  {{ passwordStrength | titlecase }}
                </span>
              </div>

              <div class="h-2 bg-surface-muted rounded-full overflow-hidden">
                <div
                  class="h-full transition-all duration-300"
                  [class.bg-error]="passwordStrength === 'weak'"
                  [class.bg-warning]="passwordStrength === 'medium'"
                  [class.bg-success]="passwordStrength === 'strong'"
                  [style.width]="
                    passwordStrength === 'weak' ? '33%' :
                    passwordStrength === 'medium' ? '66%' : '100%'">
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Confirm -->
        <div class="mb-6">
          <label class="block text-sm font-semibold text-text mb-2">
            Confirm Password <span class="text-error">*</span>
          </label>

          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i class="bi bi-shield-check text-text-muted"></i>
            </div>

            <input
              [type]="showConfirmPassword ? 'text' : 'password'"
              formControlName="confirmPassword"
              placeholder="Confirm password"
              class="w-full pl-11 pr-12 py-3 bg-surface border-2 border-border rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                     transition-all duration-300"
              [class.border-error]="passwordForm.get('confirmPassword')?.invalid
                                    && passwordForm.get('confirmPassword')?.touched"
            />

            <button
              type="button"
              (click)="toggleConfirmPassword.emit()"
              class="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text cursor-pointer">
              <i [class]="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>

          @if (passwordForm.get('confirmPassword')?.invalid
          && passwordForm.get('confirmPassword')?.touched) {
            <p class="mt-2 text-sm text-error flex items-center gap-1">
              <i class="bi bi-exclamation-circle"></i>
              @if (passwordForm.get('confirmPassword')?.errors?.['required']) {
                Please confirm your password
              }
              @if (passwordForm.errors?.['passwordMismatch']) {
                Passwords do not match
              }
            </p>
          }
        </div>

        <!-- Submit -->
        <app-button
          type="submit"
          [disabled]="passwordForm.invalid || isSubmitting"
          [loading]="isSubmitting"
          [fullWidth]="true"
          variant="primary"
          size="lg"
          class="mb-0"
        >
          <span class="flex items-center justify-center gap-2">
            @if (isSubmitting) {
              <i class="bi bi-hourglass-split animate-spin"></i>
              {{
                mode === 'change'
                  ? 'Changing Password...'
                  : mode === 'set'
                    ? 'Setting Password...'
                    : 'Resetting Password...'
              }}
            }
            @if (!isSubmitting) {
              <i class="bi bi-shield-check"></i>
              {{
                mode === 'change'
                  ? 'Change Password'
                  : mode === 'set'
                    ? 'Set Password'
                    : 'Reset Password'
              }}
            }
          </span>
        </app-button>

        @if (mode === 'change') {
          <app-button
            type="button"
            (click)="goBack.emit()"
            [fullWidth]="true"
            variant="secondary"
            size="lg"
            class="mt-3"
          >
            Cancel
          </app-button>
        }
      </form>
    </div>
  `
})
export class PasswordFormComponent {
  @Input() mode: 'change' | 'set' | 'reset' = 'change';
  @Input() passwordForm!: FormGroup;

  @Input() showCurrentPassword = false;
  @Input() showNewPassword = false;
  @Input() showConfirmPassword = false;

  @Input() passwordStrength: 'weak' | 'medium' | 'strong' = 'weak';
  @Input() hasMinLength = false;
  @Input() hasUpperCase = false;
  @Input() hasLowerCase = false;
  @Input() hasNumber = false;
  @Input() hasSpecialChar = false;

  @Input() isSubmitting = false;

  @Output() onSubmit = new EventEmitter<void>();
  @Output() toggleCurrentPassword = new EventEmitter<void>();
  @Output() toggleNewPassword = new EventEmitter<void>();
  @Output() toggleConfirmPassword = new EventEmitter<void>();
  @Output() goBack = new EventEmitter<void>();
}
