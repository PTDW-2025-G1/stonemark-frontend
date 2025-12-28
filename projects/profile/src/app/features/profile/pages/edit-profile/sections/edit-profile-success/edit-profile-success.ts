import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ButtonComponent} from '@shared/ui/button/button';

export interface UpdatedProfileData {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-edit-profile-success',
  standalone: true,
  imports: [RouterModule, ButtonComponent],
  templateUrl: './edit-profile-success.html'
})
export class EditProfileSuccessComponent {
  @Input() updatedProfile: UpdatedProfileData = {
    firstName: '',
    lastName: ''
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
