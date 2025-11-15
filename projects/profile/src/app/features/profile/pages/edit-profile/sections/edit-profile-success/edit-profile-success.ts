import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface UpdatedProfileData {
  firstName: string;
  lastName: string;
  telephone: string;
}

@Component({
  selector: 'app-edit-profile-success',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './edit-profile-success.html'
})
export class EditProfileSuccessComponent {
  @Input() updatedProfile: UpdatedProfileData = {
    firstName: '',
    lastName: '',
    telephone: ''
  };
  @Output() editAgain = new EventEmitter<void>();
  @Output() backToProfile = new EventEmitter<void>();

  onEditAgain(): void {
    this.editAgain.emit();
  }

  onBackToProfile(): void {
    this.backToProfile.emit();
  }
}
