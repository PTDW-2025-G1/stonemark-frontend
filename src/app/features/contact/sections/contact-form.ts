import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
            @if (contactForm.get('name')?.invalid && contactForm.get('name')?.touched) {
              <p class="mt-2 text-sm text-error flex items-center gap-1">
                <i class="bi bi-exclamation-circle"></i>
                Name is required
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
            @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
              <p class="mt-2 text-sm text-error flex items-center gap-1">
                <i class="bi bi-exclamation-circle"></i>
                Valid email is required
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
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i class="bi bi-tag text-text-muted"></i>
            </div>
            <select
              id="subject"
              formControlName="subject"
              class="w-full pl-11 pr-4 py-3 bg-surface border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 appearance-none cursor-pointer"
              [class.border-error]="contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched"
            >
              <option value="">Select a subject...</option>
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="collaboration">Partnership/Collaboration</option>
              <option value="bug">Report a Bug</option>
              <option value="feature">Feature Request</option>
              <option value="other">Other</option>
            </select>
            <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <i class="bi bi-chevron-down text-text-muted"></i>
            </div>
          </div>
          @if (contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched) {
            <p class="mt-2 text-sm text-error flex items-center gap-1">
              <i class="bi bi-exclamation-circle"></i>
              Please select a subject
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
          @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
            <p class="mt-2 text-sm text-error flex items-center gap-1">
              <i class="bi bi-exclamation-circle"></i>
              Message must be at least 10 characters
            </p>
          }
        </div>

        <!-- Submit Button -->
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            [disabled]="contactForm.invalid || isSubmitting"
            class="flex-1 group relative overflow-hidden bg-primary text-primary-foreground rounded-xl px-6 py-4 font-semibold text-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
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
          </button>

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
export class ContactFormComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    this.submitSuccess = false;

    // Simulação de envio (substitua por chamada real de API)
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.contactForm.reset();
    }, 1500);
  }
}
