import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '@core/services/contact/contact.service'
import {ProfileService} from '@core/services/profile/profile.service';
import {AuthService} from '@core/services/auth/auth.service';
import {SharedSelectComponent} from '@shared/ui/shared-select/shared-select';
import {ContactRequestDto} from '@api/model/contact-request-dto';
import {ButtonComponent} from '@shared/ui/button/button';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedSelectComponent, ButtonComponent],
  template: `
    <div class="bg-gradient-to-br from-surface-alt to-surface rounded-3xl border border-border p-6 sm:p-8 lg:p-10 shadow-xl">
      <div class="mb-8">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-text mb-3">
          Send Us a Message
        </h2>
        <p class="text-text-muted">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">

        <!-- Name & Email Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-semibold text-text mb-2">
              Your Name <span class="text-error">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i class="bi bi-person text-text-muted"></i>
              </div>
              <input
                type="text"
                id="name"
                formControlName="name"
                placeholder="John Doe"
                class="w-full pl-11 pr-4 py-3 bg-surface border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                [class.border-error]="contactForm.get('name')?.invalid && contactForm.get('name')?.touched"
              />
            </div>
            @if (
              (contactForm.get('name')?.invalid && contactForm.get('name')?.touched)
              || fieldErrors['name']
              ) {
              <p class="mt-2 text-sm text-error flex items-center gap-1">
                <i class="bi bi-exclamation-circle"></i>
                {{ fieldErrors['name'] || 'Name is required' }}
              </p>
            }
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-semibold text-text mb-2">
              Email Address <span class="text-error">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i class="bi bi-envelope text-text-muted"></i>
              </div>
              <input
                type="email"
                id="email"
                formControlName="email"
                placeholder="john@example.com"
                class="w-full pl-11 pr-4 py-3 bg-surface border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                [class.border-error]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched"
              />
            </div>
            @if (
              (contactForm.get('email')?.invalid && contactForm.get('email')?.touched)
              || fieldErrors['email']
              ) {
              <p class="mt-2 text-sm text-error flex items-center gap-1">
                <i class="bi bi-exclamation-circle"></i>
                {{ fieldErrors['email'] || 'Valid email is required' }}
              </p>
            }
          </div>
        </div>

        <!-- Subject -->
        <div>
          <label for="subject" class="block text-sm font-semibold text-text mb-2">
            Subject <span class="text-error">*</span>
          </label>
          <div class="relative">
            <app-shared-select
              [options]="subjectOptions"
              [selected]="contactForm.get('subject')?.value"
              label="Select a subject..."
              optionLabelKey="name"
              optionValueKey="id"
              [searchable]="false"
              (selectionChange)="contactForm.get('subject')?.setValue($event)"
              [class.border-error]="contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched"
            ></app-shared-select>
          </div>
          @if (
            (contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched)
            || fieldErrors['subject']
            ) {
            <p class="mt-2 text-sm text-error flex items-center gap-1">
              <i class="bi bi-exclamation-circle"></i>
              {{ fieldErrors['subject'] || 'Please select a subject' }}
            </p>
          }
        </div>

        <!-- Message -->
        <div>
          <label for="message" class="block text-sm font-semibold text-text mb-2">
            Message <span class="text-error">*</span>
          </label>
          <textarea
            id="message"
            formControlName="message"
            rows="6"
            placeholder="Tell us more about your inquiry..."
            class="w-full px-4 py-3 bg-surface border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none"
            [class.border-error]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched"
          ></textarea>
          @if (
            (contactForm.get('message')?.invalid && contactForm.get('message')?.touched)
            || fieldErrors['message']
            ) {
            <p class="mt-2 text-sm text-error flex items-center gap-1">
              <i class="bi bi-exclamation-circle"></i>
              {{ fieldErrors['message'] || 'Message must be at least 10 characters' }}
            </p>
          }
        </div>

        <!-- Submit Button -->
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <app-button
            type="submit"
            [disabled]="contactForm.invalid || isSubmitting"
            variant="primary"
            size="lg"
            [fullWidth]="true"
          >
          <span class="relative flex items-center justify-center gap-2">
            @if (isSubmitting) {
              <i class="bi bi-hourglass-split animate-spin"></i>
              Sending...
            } @else if (submitSuccess) {
              <i class="bi bi-check-circle"></i>
              Message Sent!
            } @else {
              <i class="bi bi-send"></i>
              Send Message
            }
          </span>
          </app-button>

          @if (submitError) {
            <div class="flex items-center gap-2 px-4 py-3 bg-error/10 border border-error/30 rounded-xl text-error mt-3">
              <i class="bi bi-x-circle-fill"></i>
              <span class="text-sm font-medium">Something went wrong. Please try again later.</span>
            </div>
          }

          @if (submitSuccess) {
            <div class="flex items-center gap-2 px-4 py-3 bg-success/10 border border-success/30 rounded-xl text-success">
              <i class="bi bi-check-circle-fill"></i>
              <span class="text-sm font-medium">Thanks! We'll be in touch soon.</span>
            </div>
          }
        </div>

      </form>
    </div>
  `
})
export class ContactFormComponent implements OnInit{
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  fieldErrors: Record<string, string> = {};
  user: any = null;

  subjectOptions = [
    { id: 'General', name: 'General Inquiry' },
    { id: 'Support', name: 'Technical Support' },
    { id: 'Collaboration', name: 'Partnership/Collaboration' },
    { id: 'Bug', name: 'Report a Bug' },
    { id: 'Feature', name: 'Feature Request' },
    { id: 'Other', name: 'Other' }
  ];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private profileService: ProfileService,
    private authService: AuthService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    if (this.authService.getAccessToken()) {
      this.profileService.getCurrentUser().subscribe({
        next: user => {
          this.user = user;

          let email = '';
          // Todo: make call to API or get rid of email autofill

          this.contactForm.patchValue({
            name: `${user.firstName} ${user.lastName}`,
            email: email
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.fieldErrors = {};
    this.submitError = false;
    this.submitSuccess = false;

    const requestPayload: ContactRequestDto = {
      name: this.contactForm.getRawValue().name ?? '',
      email: this.contactForm.getRawValue().email ?? '',
      subject: this.contactForm.getRawValue().subject ?? '',
      message: this.contactForm.getRawValue().message ?? ''
    };

    this.contactService.create(requestPayload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.contactForm.reset();
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 400 && err.error && typeof err.error === 'object') {
          this.fieldErrors = err.error;
          Object.keys(this.fieldErrors).forEach(field => {
            this.contactForm.get(field)?.markAsTouched();
          });
          return;
        }
        this.submitError = true;
      }
    });
  }
}
