import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tfa-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tfa-verification.html',
})
export class TfaVerificationComponent implements OnInit {
  @Output() verify = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      code: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9]{6}$/) // aceita letras e números
        ]
      ]
    });
  }

  get codeControl() {
    return this.form.get('code');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isSubmitting = true;
    this.verify.emit(this.form.value.code);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  // Auto-submit when 6 digits are entered
  onCodeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase(); // Remove non-alphanumeric, force uppercase

    if (value.length <= 6) {
      this.form.patchValue({ code: value });

      if (value.length === 6) {
        setTimeout(() => {
          if (this.form.valid) {
            this.onSubmit();
          }
        }, 300);
      }
    }
  }
}
