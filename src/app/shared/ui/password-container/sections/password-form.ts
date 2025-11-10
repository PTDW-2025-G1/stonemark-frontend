import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-gradient-to-br from-surface-alt to-surface rounded-2xl border-2 border-border p-6 sm:p-8 shadow-xl">
      <form [formGroup]="passwordForm" (ngSubmit)="onSubmit.emit()">

        <!-- Current Password -->
        @if (mode === 'change') {
          <div class="mb-6">
            <label for="currentPassword" class="block text-sm font-semibold text-text mb-2">
              Current Password <span class="text-error">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i class="bi bi-lock text-text-muted"></i>
              </div>
              <input
                [type]="showCurrentPassword ? 'text' : 'password'"
                id="currentPassword"
                formControlName="currentPassword"
                placeholder="Enter current password"
                class="w-full pl-11 pr-12 py-3 bg-surface border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                [class.border-error]="passwordForm.get('currentPassword')?.invalid && passwordForm.get('currentPassword')?.touched"
              />
              <button
                type="button"
                (click)="toggleCurrentPassword.emit()"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text">
                <i [class]="showCurrentPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
            @if (passwordForm.get('currentPassword')?.invalid && passwordForm.get('currentPassword')?.touched) {
              <p class="mt-2 text-sm text-error flex items-center gap-1">
                <i class="bi bi-exclamation-circle"></i>
                Current password is required
              </p>
            }
          </div>
        }

        <!-- New Password -->
        <div class="mb-6">
          <label for="newPassword" class="block text-sm font-semibold text-text mb-2">
            {{ mode === 'change' ? 'New Password' : 'New Password' }} <span class="text-error">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i class="bi bi-key text-text-muted"></i>
            </div>
            <input
              [type]="showNewPassword ? 'text' : 'password'"
              id="newPassword"
              formControlName="newPassword"
              placeholder="Enter new password"
              class="w-full pl-11 pr-12 py-3 bg-surface border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
              [class.border-error]="passwordForm.get('newPassword')?.invalid && passwordForm.get('newPassword')?.touched"
            />
            <button
              type="button"
              (click)="toggleNewPassword.emit()"
              class="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text">
              <i [class]="showNewPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
          @if (passwordForm.get('newPassword')?.invalid && passwordForm.get('newPassword')?.touched) {
            <p class="mt-2 text-sm text-error flex items-center gap-1">
              <i class="bi bi-exclamation-circle"></i>
              @if (passwordForm.get('newPassword')?.errors?.['required']) {
                New password is required
              }
              @if (passwordForm.get('newPassword')?.errors?.['minlength']) {
                Password must be at least 8 characters
              }
              @if (passwordForm.get('newPassword')?.errors?.['pattern']) {
                Password must contain uppercase, lowercase, number and special character
              }
            </p>
          }

          <!-- Password Strength Indicator -->
          @if (passwordForm.get('newPassword')?.value) {
            <div class="mt-3">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-semibold text-text-muted">Password Strength</span>
                <span class="text-xs font-semibold"
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
                  [style.width]="passwordStrength === 'weak' ? '33%' : passwordStrength === 'medium' ? '66%' : '100%'">
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Confirm Password -->
        <div class="mb-6">
          <label for="confirmPassword" class="block text-sm font-semibold text-text mb-2">
            Confirm New Password <span class="text-error">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i class="bi bi-shield-check text-text-muted"></i>
            </div>
            <input
              [type]="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              formControlName="confirmPassword"
              placeholder="Confirm new password"
              class="w-full pl-11 pr-12 py-3 bg-surface border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
              [class.border-error]="passwordForm.get('confirmPassword')?.invalid && passwordForm.get('confirmPassword')?.touched"
            />
            <button
              type="button"
              (click)="toggleConfirmPassword.emit()"
              class="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text">
              <i [class]="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
          @if (passwordForm.get('confirmPassword')?.invalid && passwordForm.get('confirmPassword')?.touched) {
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

        <!-- Password Requirements -->
        <div class="mb-6 p-4 bg-surface rounded-xl border border-border">
          <p class="text-xs font-semibold text-text-muted mb-2 uppercase tracking-wider">Password Requirements:</p>
          <ul class="space-y-1.5">
            <li class="text-xs text-text-muted flex items-center gap-2">
              <i [class]="hasMinLength ? 'bi bi-check-circle text-success' : 'bi bi-circle text-text-muted'"></i>
              At least 8 characters
            </li>
            <li class="text-xs text-text-muted flex items-center gap-2">
              <i [class]="hasUpperCase ? 'bi bi-check-circle text-success' : 'bi bi-circle text-text-muted'"></i>
              One uppercase letter
            </li>
            <li class="text-xs text-text-muted flex items-center gap-2">
              <i [class]="hasLowerCase ? 'bi bi-check-circle text-success' : 'bi bi-circle text-text-muted'"></i>
              One lowercase letter
            </li>
            <li class="text-xs text-text-muted flex items-center gap-2">
              <i [class]="hasNumber ? 'bi bi-check-circle text-success' : 'bi bi-circle text-text-muted'"></i>
              One number
            </li>
            <li class="text-xs text-text-muted flex items-center gap-2">
              <i [class]="hasSpecialChar ? 'bi bi-check-circle text-success' : 'bi bi-circle text-text-muted'"></i>
              One special character
            </li>
          </ul>
        </div>

        <!-- Slots opcionais -->
        <ng-content select="[success]"></ng-content>
        <ng-content select="[error]"></ng-content>

        <!-- Submit -->
        <button
          type="submit"
          [disabled]="passwordForm.invalid || isSubmitting"
          class="w-full group relative overflow-hidden px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none">
          <div class="absolute inset-0 bg-gradient-to-r from-primary/80 to-info/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span class="relative flex items-center justify-center gap-2">
            @if (isSubmitting) {
              <i class="bi bi-hourglass-split animate-spin"></i>
              {{ mode === 'change' ? 'Changing Password...' : 'Resetting Password...' }}
            }
            @if (!isSubmitting) {
              <i class="bi bi-shield-check"></i>
              {{ mode === 'change' ? 'Change Password' : 'Reset Password' }}
            }
          </span>
        </button>
        @if (mode === 'change') {
          <button
            type="button"
            (click)="goBack.emit()"
            class="w-full mt-3 px-6 py-3 bg-surface-alt border-2 border-border text-text rounded-xl font-semibold hover:border-primary transition-all duration-300">
            Cancel
          </button>
        }
      </form>
    </div>
  `
})
export class PasswordFormComponent {
  @Input() mode: 'change' | 'reset' = 'change';
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
