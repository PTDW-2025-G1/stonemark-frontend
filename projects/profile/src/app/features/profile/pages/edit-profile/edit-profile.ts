import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {EditProfileFormComponent, ProfileFormData} from './sections/edit-profile-form/edit-profile-form';
import {EditProfileSuccessComponent} from './sections/edit-profile-success/edit-profile-success';
import {AccountService} from '@core/services/account/account.service';
import {UserDto} from '@api/model/user-dto';
import { BreadcrumbProfileComponent } from '@shared/ui/breadcrumb-profile/breadcrumb-profile';
import { switchMap, map } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, EditProfileFormComponent, EditProfileSuccessComponent, BreadcrumbProfileComponent],
  templateUrl: './edit-profile.html'
})
export class EditProfileComponent implements OnInit {
  currentProfile: ProfileFormData = {
    firstName: '',
    lastName: '',
  };
  profileUpdated: boolean = false;
  isSubmitting: boolean = false;
  errorMessage: string = '';
  selectedPhoto: File | null = null;

  constructor(private router: Router, private profileService : AccountService) {}

  ngOnInit(): void {
    this.loadCurrentProfile();
  }

  private loadCurrentProfile(): void {
    this.profileService.getCurrentUser().subscribe({
      next: (user: UserDto) => {
        this.currentProfile = {
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          photoId: user.photoId
        }
      },
      error: err => {
        console.error('Failed to load current profile:', err);
      }
    });
  }

  onPhotoSelected(file: File): void {
    this.selectedPhoto = file;
  }

  onSubmitProfile(profileData: ProfileFormData): void {
    this.isSubmitting = true;
    this.errorMessage = '';

    const updateProfile$ = this.selectedPhoto
      ? this.profileService.uploadPhoto(this.selectedPhoto).pipe(
          switchMap((userDto) => {
            const photoId = userDto.photoId;
            return this.profileService.updateProfile({
              firstName: profileData.firstName,
              lastName: profileData.lastName,
              photoId: photoId
            }).pipe(
              map(() => photoId)
            );
          })
        )
      : this.profileService.updateProfile({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          photoId: this.currentProfile.photoId
        }).pipe(
          map(() => this.currentProfile.photoId)
        );

    updateProfile$.subscribe({
      next: (photoId) => {
        this.isSubmitting = false;
        this.profileUpdated = true;
        this.currentProfile = {
          ...this.currentProfile,
          ...profileData,
          photoId: photoId
        };
        this.selectedPhoto = null;
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = 'Error by updating profile.';
        console.error('Error by updating profile:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }

  editAgain(): void {
    this.profileUpdated = false;
  }
}
