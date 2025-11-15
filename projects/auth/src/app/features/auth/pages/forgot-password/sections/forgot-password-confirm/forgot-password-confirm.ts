import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password-confirm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password-confirm.html'
})
export class ForgotPasswordConfirmComponent {
  @Input() form!: FormGroup;
  @Input() loading = false;
  @Input() error: string | null = null;
  @Output() submit = new EventEmitter<void>();
}
