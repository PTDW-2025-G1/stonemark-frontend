import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {PasswordHeaderComponent} from './sections/password-header';
import {PasswordFormComponent} from './sections/password-form';
import {PasswordMessagesComponent} from './sections/password-messages';
import {PasswordHelpComponent} from './sections/password-help';

@Component({
  selector: 'app-password-container',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordHeaderComponent,
    PasswordFormComponent,
    PasswordMessagesComponent,
    PasswordHelpComponent
  ],
  templateUrl: './password-container.html'
})
export class PasswordContainerComponent {
  // === Modo geral ===
  @Input() mode: 'change' | 'reset' = 'change';
  @Input() token?: string | null;
  @Input() success = false;

  // === Formulário ===
  @Input() passwordForm!: FormGroup;

  // === Estados de UI ===
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

  // === Mensagens ===
  @Input() submitSuccess = false;
  @Input() submitError = false;
  @Input() errorMessage = '';

  // === Outputs ===
  @Output() onSubmit = new EventEmitter<void>();
  @Output() toggleCurrentPassword = new EventEmitter<void>();
  @Output() toggleNewPassword = new EventEmitter<void>();
  @Output() toggleConfirmPassword = new EventEmitter<void>();
  @Output() goBack = new EventEmitter<void>();
}
