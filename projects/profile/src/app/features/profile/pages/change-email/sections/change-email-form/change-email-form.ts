import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-change-email-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './change-email-form.html'
})
export class ChangeEmailFormComponent implements OnInit {
  @Input() currentEmail: string = '';
  @Input() isSubmitting: boolean = false;
  @Input() errorMessage: string = '';
  @Output() submitEmail = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  emailForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      newEmail: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required]]
    }, { validators: this.emailMatchValidator });
  }

  emailMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newEmail = control.get('newEmail');
    const confirmEmail = control.get('confirmEmail');
    if (!newEmail || !confirmEmail) return null;
    return newEmail.value === confirmEmail.value ? null : { emailMismatch: true };
  }

  onSubmit(): void {
    if (this.emailForm.valid) {
      this.submitEmail.emit(this.emailForm.get('newEmail')?.value);
    } else {
      Object.keys(this.emailForm.controls).forEach(key => {
        this.emailForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
