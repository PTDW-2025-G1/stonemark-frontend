import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountSecurityService } from '@core/services/account/account-security/account-security.service';
import { AccountContactService } from '@core/services/account/account-contact/account-contact.service';
import { UserContactDto } from '@api/model/user-contact-dto';
import { BreadcrumbProfileComponent } from '@shared/ui/breadcrumb-profile/breadcrumb-profile';
import {ButtonComponent} from '@shared/ui/button/button';

@Component({
  selector: 'app-account-security',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbProfileComponent, ButtonComponent],
  templateUrl: './account-security.html'
})
export class AccountSecurityComponent implements OnInit {

  tfaEnabled = false;
  currentMethod: 'TOTP' | 'EMAIL' | 'SMS' | 'NONE' = 'NONE';

  hasVerifiedEmail = false;
  hasVerifiedPhone = false;

  qrCodeImageUrl?: string;

  code = '';
  message: string | null = null;

  selectedContactMethod?: 'EMAIL' | 'SMS';
  showContactCodeInput = false;

  loading = false;

  constructor(
    private securityService: AccountSecurityService,
    private contactService: AccountContactService
  ) {}

  ngOnInit(): void {
    this.loadContacts();
    this.loadTfaStatus();
  }

  private loadContacts(): void {
    this.contactService.getContacts().subscribe({
      next: (contacts: UserContactDto[]) => {
        this.hasVerifiedEmail = contacts.some(
          c => c.type === 'EMAIL' && c.verified
        );

        this.hasVerifiedPhone = contacts.some(
          c => c.type === 'TELEPHONE' && c.verified
        );
      }
    });
  }

  private loadTfaStatus(): void {
    this.securityService.getTfaStatus().subscribe({
      next: (status) => {
        this.tfaEnabled = status.enabled;
        this.currentMethod = status.method;
      }
    });
  }

  setupTotp(): void {
    this.resetMessages();
    this.loading = true;

    this.securityService.setupTotp().subscribe({
      next: (res) => {
        this.qrCodeImageUrl = res.qrCodeImageUrl;
        this.message = 'Scan the QR code with Google Authenticator.';
        this.loading = false;
      },
      error: () => {
        this.message = 'Failed to setup TOTP.';
        this.loading = false;
      }
    });
  }

  enableTotp(): void {
    if (!this.code) return;

    this.resetMessages();
    this.loading = true;

    this.securityService.enableTotp(this.code).subscribe({
      next: (res) => {
        this.message = res.message ?? null;
        this.currentMethod = 'TOTP';
        this.tfaEnabled = true;
        this.code = '';
        this.loading = false;
      },
      error: () => {
        this.message = 'Invalid TOTP code.';
        this.loading = false;
      }
    });
  }

  useContactMethod(method: 'EMAIL' | 'SMS'): void {
    this.resetMessages();
    this.loading = true;

    this.securityService.setTfaMethod(method).subscribe({
      next: () => {
        this.securityService.requestContactCode().subscribe({
          next: () => {
            this.selectedContactMethod = method;
            this.showContactCodeInput = true;
            this.message = `A verification code was sent via ${method}.`;
            this.loading = false;
          }
        });
      },
      error: () => {
        this.message = 'Failed to set 2FA method.';
        this.loading = false;
      }
    });
  }

  verifyContactCode(): void {
    if (!this.code || !this.selectedContactMethod) return;

    const method = this.selectedContactMethod;
    this.resetMessages();
    this.loading = true;

    this.securityService.verifyContactCode(this.code).subscribe({
      next: (res) => {
        this.message = res.message ?? null;
        this.currentMethod = method;
        this.tfaEnabled = true;
        this.code = '';
        this.showContactCodeInput = false;
        this.loading = false;
      },
      error: () => {
        this.message = 'Invalid verification code.';
        this.loading = false;
      }
    });
  }

  requestDisableCode(): void {
    this.resetMessages();
    this.loading = true;

    this.securityService.requestContactCode().subscribe({
      next: (res) => {
        this.message = res.message ?? '2FA code sent.';
        this.loading = false;
      },
      error: () => {
        this.message = 'Failed to send 2FA code.';
        this.loading = false;
      }
    });
  }

  disableTfa(): void {
    if (!this.code) return;

    this.resetMessages();
    this.loading = true;

    this.securityService.disableTfa(this.code).subscribe({
      next: (res) => {
        this.message = res.message ?? null;
        this.tfaEnabled = false;
        this.currentMethod = 'NONE';
        this.code = '';
        this.qrCodeImageUrl = undefined;
        this.showContactCodeInput = false;
        this.loading = false;
      },
      error: () => {
        this.message = 'Invalid 2FA code.';
        this.loading = false;
      }
    });
  }

  private resetMessages(): void {
    this.message = null;
  }

  getFormattedMethod(): string {
    switch (this.currentMethod) {
      case 'EMAIL':
        return 'Email';
      case 'SMS':
        return 'SMS';
      case 'TOTP':
        return 'Authenticator App';
      default:
        return '';
    }
  }
}
