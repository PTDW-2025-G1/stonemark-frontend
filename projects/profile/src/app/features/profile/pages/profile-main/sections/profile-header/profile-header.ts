import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  templateUrl: './profile-header.html'
})
export class ProfileHeaderComponent {
  @Input() user: any;

  @Output() editProfile = new EventEmitter<void>();
  @Output() changePassword = new EventEmitter<void>();
  @Output() openSecurity = new EventEmitter<void>();
  @Output() openContacts = new EventEmitter<void>();
  @Output() openSocial = new EventEmitter<void>();

  @Output() logout = new EventEmitter<void>();
}
