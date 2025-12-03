import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-telephone-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './change-telephone-form.html'
})
export class ChangeTelephoneFormComponent implements OnInit {
  @Input() currentTelephone: string = '';
  @Input() isSubmitting: boolean = false;
  @Input() errorMessage: string = '';
  @Input() awaitingCode: boolean = false;
  @Output() submitTelephone = new EventEmitter<string>();
  @Output() submitCode = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  telephoneForm!: FormGroup;
  codeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.telephoneForm = this.fb.group({
      newTelephone: ['', [Validators.required, Validators.pattern(/^\+351\d{9}$/)]],
      confirmTelephone: ['', [Validators.required]]
    }, { validators: this.telephoneMatchValidator });

    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  telephoneMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newTelephone = control.get('newTelephone');
    const confirmTelephone = control.get('confirmTelephone');
    if (!newTelephone || !confirmTelephone) return null;
    return newTelephone.value === confirmTelephone.value ? null : { telephoneMismatch: true };
  }

  onSubmit(): void {
    if (this.telephoneForm.valid) {
      this.submitTelephone.emit(this.telephoneForm.get('newTelephone')?.value);
    } else {
      Object.keys(this.telephoneForm.controls).forEach(key => {
        this.telephoneForm.get(key)?.markAsTouched();
      });
    }
  }

  onSubmitCode(): void {
    if (this.codeForm.valid) {
      this.submitCode.emit(this.codeForm.get('code')?.value);
    } else {
      this.codeForm.get('code')?.markAsTouched();
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
