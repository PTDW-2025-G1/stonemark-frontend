import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '@shared/ui/button/button';

export interface ProfileFormData {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-edit-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './edit-profile-form.html'
})
export class EditProfileFormComponent implements OnInit, OnChanges {
  @Input() currentProfile: ProfileFormData = {
    firstName: '',
    lastName: '',
  };
  @Input() isSubmitting: boolean = false;
  @Input() errorMessage: string = '';
  @Output() submitProfile = new EventEmitter<ProfileFormData>();
  @Output() cancel = new EventEmitter<void>();

  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCurrentProfile();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentProfile'] && !changes['currentProfile'].firstChange) {
      this.loadCurrentProfile();
    }
  }

  private initializeForm(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  private loadCurrentProfile(): void {
    if (this.currentProfile) {
      this.profileForm.patchValue(this.currentProfile);
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.submitProfile.emit(this.profileForm.value);
    } else {
      Object.keys(this.profileForm.controls).forEach(key => {
        this.profileForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  hasChanges(): boolean {
    const formValue = this.profileForm.value;
    return formValue.firstName !== this.currentProfile.firstName ||
      formValue.lastName !== this.currentProfile.lastName;
  }
}
