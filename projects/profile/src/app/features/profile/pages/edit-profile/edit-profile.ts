import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {EditProfileFormComponent, ProfileFormData} from './sections/edit-profile-form/edit-profile-form';
import {EditProfileSuccessComponent} from './sections/edit-profile-success/edit-profile-success';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, EditProfileFormComponent, EditProfileSuccessComponent],
  templateUrl: './edit-profile.html'
})
export class EditProfileComponent implements OnInit {
  currentProfile = {
    firstName: 'John',
    lastName: 'Doe',
    telephone: '+351 912 345 678',
    email: 'john.doe@example.com'
  };
  profileUpdated: boolean = false;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCurrentProfile();
  }

  private loadCurrentProfile(): void {}

  onSubmitProfile(profileData: ProfileFormData): void {
    this.isSubmitting = true;
    this.errorMessage = '';

    setTimeout(() => {
      this.isSubmitting = false;
      this.profileUpdated = true;

      this.currentProfile = {
        ...this.currentProfile,
        ...profileData
      };
    }, 1500);
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }

  editAgain(): void {
    this.profileUpdated = false;
  }
}
