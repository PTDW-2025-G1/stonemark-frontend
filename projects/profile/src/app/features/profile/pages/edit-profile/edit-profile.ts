import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {EditProfileFormComponent, ProfileFormData} from './sections/edit-profile-form/edit-profile-form';
import {EditProfileSuccessComponent} from './sections/edit-profile-success/edit-profile-success';
import {ProfileService, UserDto} from '@core/services/profile.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, EditProfileFormComponent, EditProfileSuccessComponent],
  templateUrl: './edit-profile.html'
})
export class EditProfileComponent implements OnInit {
  currentProfile = {
    firstName: '',
    lastName: '',
    telephone: '',
    email: ''
  };
  profileUpdated: boolean = false;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private profileService : ProfileService) {}

  ngOnInit(): void {
    this.loadCurrentProfile();
  }

  private loadCurrentProfile(): void {
    this.profileService.getCurrentUser().subscribe({
      next: (user: UserDto) => {
        this.currentProfile = {
          firstName: user.firstName,
          lastName: user.lastName,
          telephone: user.telephone,
          email: user.email
        }
      },
      error: err => {
        console.error('Failed to load current profile:', err);
      }
    });
  }

  onSubmitProfile(profileData: ProfileFormData): void {
    this.isSubmitting = true;
    this.errorMessage = '';

    this.profileService.updateProfile({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      telephone: profileData.telephone
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.profileUpdated = true;
        this.currentProfile = {
          ...this.currentProfile,
          ...profileData
        };
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
