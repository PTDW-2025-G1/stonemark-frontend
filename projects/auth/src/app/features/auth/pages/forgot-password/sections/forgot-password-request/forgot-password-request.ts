import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password-request.html'
})
export class ForgotPasswordRequestComponent {
  @Input() form!: FormGroup;
  @Input() loading = false;
  @Output() submit = new EventEmitter<void>();
  @Input() emailError: string | null = null;
}
