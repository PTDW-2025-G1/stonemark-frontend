import {Component, Input, Output, EventEmitter, inject} from '@angular/core';
import {AuthService} from '@core/services/auth/auth.service';

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
  @Output() goToStaff = new EventEmitter<void>();

  @Output() logout = new EventEmitter<void>();

  private authService = inject(AuthService);

  getInitials(): string {
    if (!this.user?.name) return '';

    const names = this.user.name.trim().split(' ');
    if (names.length === 0) return '';

    const firstInitial = names[0][0]?.toUpperCase() || '';
    const lastInitial = names.length > 1 ? names[names.length - 1][0]?.toUpperCase() || '' : '';

    return firstInitial + lastInitial;
  }

  isStaff(): boolean {
    return this.authService.isStaff();
  }
}
