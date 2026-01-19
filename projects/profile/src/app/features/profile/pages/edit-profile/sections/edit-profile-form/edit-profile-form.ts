import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '@shared/ui/button/button';
import { CommonModule } from '@angular/common';
import { ImageUtils, ImageVariant } from '@shared/utils/image.utils';

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  photoId?: number;
}

@Component({
  selector: 'app-edit-profile-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonComponent],
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
  @Output() uploadPhoto = new EventEmitter<File>();

  profileForm!: FormGroup;
  previewUrl: string | null = null;

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
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      photoId: [null]
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
      formValue.lastName !== this.currentProfile.lastName ||
      formValue.photoId !== this.currentProfile.photoId ||
      !!this.previewUrl;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadPhoto.emit(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  getImageUrl(photoId: number): string {
    return ImageUtils.getImageUrl(photoId, '', ImageVariant.THUMBNAIL);
  }
}
