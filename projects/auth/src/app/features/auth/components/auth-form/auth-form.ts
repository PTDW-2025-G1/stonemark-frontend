import {Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from '@shared/ui/input-field/input-field';
import { ButtonComponent } from '@shared/ui/button/button';
import { SocialAuthButtonsComponent } from '../social-auth-buttons/social-auth-buttons';
import {AuthenticationRequestDto} from '@api/model/authentication-request-dto';
import {RegisterRequestDto} from '@api/model/register-request-dto';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputFieldComponent, ButtonComponent, SocialAuthButtonsComponent],
  template: `
    <div class="bg-surface shadow-lg rounded-2xl p-8 my-12">
      <!-- Title -->
      <h1 class="font-serif text-3xl font-normal text-primary mb-2">
        {{ title }}
      </h1>
      <p class="text-sm text-text-muted mb-8">
        {{ subtitle }}
      </p>

      <!-- Social Buttons (top for signup) -->
      @if (showSocialAuth && socialAuthPosition === 'top') {
        <app-social-auth-buttons
          (googleClick)="onGoogleAuth()"
        />

        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-border"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-surface text-text-muted">Or</span>
          </div>
        </div>
      }

      <!-- Error Message -->
      @if (errorMsg && errorMsg.length > 0) {
        <div class="text-error text-sm mb-4">
          {{ errorMsg }}
        </div>
      }

      <!-- Form -->
      <form [formGroup]="form" class="text-left" (ngSubmit)="onSubmit($event)">
        <!-- Signup fields (signup only) -->
        @if (mode === 'register') {
          <div class="grid grid-cols-2 gap-4 mb-4">
            <app-input-field
              label="First Name"
              placeholder="eg. John"
              formControlName="firstName"
              [error]="getError('firstName')"
            />
            <app-input-field
              label="Last Name"
              placeholder="eg. Francisco"
              formControlName="lastName"
              [error]="getError('lastName')"
            />
          </div>
        }

        <div class="mb-4">
          <app-input-field
            label="Username"
            placeholder="eg. john"
            formControlName="username"
            [error]="getError('username')"
          />
        </div>

        <div class="mb-8">
          <app-input-field
            label="Password"
            type="password"
            placeholder="Enter your password"
            formControlName="password"
            [error]="getError('password')"
            [showPasswordToggle]="true"
          />
          @if (!form.get('password')?.errors) {
            <p class="text-xs text-text-muted mt-2">
              Must be at least 8 characters.
            </p>
          }

          @if (mode === 'login') {
            <p class="text-sm text-right mt-4">
              <a
                (click)="onForgotPassword($event)"
                class="text-text-muted font-semibold hover:opacity-70 cursor-pointer"
              >
                Forgot password?
              </a>
            </p>
          }
        </div>

        <app-button
          type="submit"
          variant="primary"
          [fullWidth]="true"
          [disabled]="form.invalid || loading"
          [loading]="loading"
        >
          {{ submitButtonText }}
        </app-button>
      </form>

      <!-- Toggle Auth Mode -->
      <p class="text-sm text-text-muted text-center mt-8">
        {{ toggleText }}
        <a
          (click)="onToggleMode($event)"
          class="text-text font-semibold hover:opacity-70 cursor-pointer"
        >
          {{ toggleLinkText }}
        </a>
      </p>

      <!-- Social Buttons (bottom for login) -->
      @if (showSocialAuth && socialAuthPosition === 'bottom') {
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-border"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-surface text-text-muted">Or</span>
          </div>
        </div>

        <app-social-auth-buttons
          (googleClick)="onGoogleAuth()"
        />
      }
    </div>
  `
})
export class AuthFormComponent implements OnInit, OnChanges {
  @Input() mode: 'login' | 'register' = 'register';
  @Input() loading = false;
  @Input() showSocialAuth = true;
  @Input() errorMsg: string | null = null;
  @Input() fieldErrors: Record<string, string> = {};

  @Output() submit = new EventEmitter<AuthenticationRequestDto | RegisterRequestDto>();
  @Output() toggleMode = new EventEmitter<void>();
  @Output() googleAuth = new EventEmitter<void>();
  @Output() forgotPassword = new EventEmitter<string | void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.updateFormValidators();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode']) {
      this.updateFormValidators();
    }
  }

  get title(): string {
    return this.mode === 'register' ? 'Sign Up Account' : 'Sign In';
  }

  get subtitle(): string {
    return this.mode === 'register'
      ? 'Enter your personal data to create your account.'
      : 'Welcome back! Please enter your credentials.';
  }

  get submitButtonText(): string {
    return this.mode === 'register' ? 'Sign Up' : 'Sign In';
  }

  get toggleText(): string {
    return this.mode === 'register'
      ? 'Already have an account?'
      : "Don't have an account?";
  }

  get toggleLinkText(): string {
    return this.mode === 'register' ? 'Sign In' : 'Register';
  }

  get socialAuthPosition(): 'top' | 'bottom' {
    return this.mode === 'register' ? 'top' : 'bottom';
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      username: [''],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  private updateFormValidators(): void {
    const firstNameControl = this.form.get('firstName');
    const lastNameControl = this.form.get('lastName');
    const usernameControl = this.form.get('username');

    usernameControl?.setValidators([Validators.required]);

    if (this.mode === 'register') {
      firstNameControl?.setValidators([Validators.required]);
      lastNameControl?.setValidators([Validators.required]);
      usernameControl?.setValidators([Validators.required]);
    } else {
      firstNameControl?.clearValidators();
      lastNameControl?.clearValidators();
      usernameControl?.clearValidators();
    }

    firstNameControl?.updateValueAndValidity();
    lastNameControl?.updateValueAndValidity();
    usernameControl?.updateValueAndValidity();
  }

  getError(fieldName: string): string | null {

    if (this.fieldErrors[fieldName]) {
      return this.fieldErrors[fieldName];
    }

    const control = this.form.get(fieldName);
    if (!control || !control.touched || !control.errors) return null;

    if (control.errors['required']) return 'This field is required';
    if (control.errors['minlength'])
      return `Must be at least ${control.errors['minlength'].requiredLength} characters`;

    return null;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onToggleMode(event: Event): void {
    event.preventDefault();
    this.toggleMode.emit();
  }

  onGoogleAuth(): void {
    this.googleAuth.emit();
  }

  onForgotPassword(event?: Event): void {
    event?.preventDefault();
    const username = this.form.get('username')?.value;
    this.forgotPassword.emit(username || undefined);
  }
}
