import {Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from '@shared/ui/input-field/input-field';
import { ButtonComponent } from '@shared/ui/button/button';
import { SocialAuthButtonsComponent } from '../social-auth-buttons/social-auth-buttons';
import { TELEPHONE_PATTERN } from '@shared/utils/telephone.utils';
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
            <app-input-field
              label="Telephone"
              placeholder="+351912345678"
              formControlName="telephone"
              [error]="getError('telephone')"
              class="col-span-2"
            />
          </div>
        }

        <div class="mb-4">
          <app-input-field
            label="Email"
            type="email"
            placeholder="eg. johnfrans@gmail.com"
            formControlName="email"
            [error]="getError('email')"
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
    return this.mode === 'register' ? 'Sign Up Account' : 'Login';
  }

  get subtitle(): string {
    return this.mode === 'register'
      ? 'Enter your personal data to create your account.'
      : 'Welcome back! Please enter your credentials.';
  }

  get submitButtonText(): string {
    return this.mode === 'register' ? 'Sign Up' : 'Login';
  }

  get toggleText(): string {
    return this.mode === 'register'
      ? 'Already have an account?'
      : "Don't have an account?";
  }

  get toggleLinkText(): string {
    return this.mode === 'register' ? 'Log in' : 'Register';
  }

  get socialAuthPosition(): 'top' | 'bottom' {
    return this.mode === 'register' ? 'top' : 'bottom';
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      telephone: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  private updateFormValidators(): void {
    const firstNameControl = this.form.get('firstName');
    const lastNameControl = this.form.get('lastName');
    const telephoneControl = this.form.get('telephone');

    if (this.mode === 'register') {
      firstNameControl?.setValidators([Validators.required]);
      lastNameControl?.setValidators([Validators.required]);
      telephoneControl?.setValidators([Validators.required, Validators.pattern(TELEPHONE_PATTERN)]);
    } else {
      firstNameControl?.clearValidators();
      lastNameControl?.clearValidators();
      telephoneControl?.clearValidators();
    }

    firstNameControl?.updateValueAndValidity();
    lastNameControl?.updateValueAndValidity();
    telephoneControl?.updateValueAndValidity();
  }

  getError(fieldName: string): string | null {
    const control = this.form.get(fieldName);
    if (!control || !control.touched || !control.errors) return null;

    if (control.errors['required']) return 'This field is required';
    if (control.errors['email']) return 'Please enter a valid email';
    if (control.errors['pattern']) return 'Your telephone number is invalid should be eg. +351912345678';
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
    const email = this.form.get('email')?.value;
    this.forgotPassword.emit(email || undefined);
  }
}
