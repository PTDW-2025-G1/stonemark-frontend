import {Component, Input, Output, EventEmitter, inject} from '@angular/core';
import {AuthService} from '@core/services/auth/auth.service';
import {AccountService} from '@core/services/account/account.service';
import { MARKS_ICON } from '@core/constants/content-icons';
import { SafeHtmlPipe } from '@shared/pipes/safe-html.pipe';
import { ImageUtils, ImageVariant } from '@shared/utils/image.utils';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [SafeHtmlPipe, AsyncPipe],
  templateUrl: './profile-header.html'
})
export class ProfileHeaderComponent {
  @Input() user: any;

  @Output() editProfile = new EventEmitter<void>();
  @Output() changePassword = new EventEmitter<void>();
  @Output() setPassword = new EventEmitter<void>();
  @Output() openSecurity = new EventEmitter<void>();
  @Output() openContacts = new EventEmitter<void>();
  @Output() openSocial = new EventEmitter<void>();
  @Output() goToStaff = new EventEmitter<void>();

  @Output() logout = new EventEmitter<void>();

  private authService = inject(AuthService);
  public profileService = inject(AccountService);

  marksIcon = MARKS_ICON;

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

  getImageUrl(photoId: number): string {
    return ImageUtils.getImageUrl(photoId, '', ImageVariant.THUMBNAIL);
  }
}
