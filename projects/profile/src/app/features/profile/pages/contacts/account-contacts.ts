import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountContactService } from '@core/services/account-contact/account-contact.service';
import { AuthService } from '@core/services/auth/auth.service';

import { UserContactDto } from '@api/model/user-contact-dto';
import { ContactDto } from '@api/model/contact-dto';
import { BreadcrumbProfileComponent } from '@shared/ui/breadcrumb-profile/breadcrumb-profile';

@Component({
  selector: 'app-account-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbProfileComponent],
  templateUrl: './account-contacts.html'
})
export class AccountContactsComponent implements OnInit {
  contacts: UserContactDto[] = [];

  newContactValue = '';
  newContactType: ContactDto.TypeEnum = ContactDto.TypeEnum.Email;

  verifyingContact: UserContactDto | null = null;
  verificationCode = '';

  contactToDelete: UserContactDto | null = null;
  showReauthModal = false;
  reauthPassword = '';
  reauthOtp = '';
  reauthLoading = false;
  reauthError: string | null = null;
  reauthSuccess: string | null = null;

  message: string | null = null;
  messageType: 'success' | 'error' | 'info' = 'info';

  protected readonly ContactDto = ContactDto;

  private readonly emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private readonly phoneRegex = /^\+351\d{9}$/;

  constructor(
    private contactService: AccountContactService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.sortContacts();
      }
    });
  }

  private sortContacts(): void {
    this.contacts.sort((a, b) => {
      if (a.primaryContact && !b.primaryContact) return -1;
      if (!a.primaryContact && b.primaryContact) return 1;
      if (a.verified && !b.verified) return -1;
      if (!a.verified && b.verified) return 1;
      return (a.value || '').localeCompare(b.value || '');
    });
  }

  addContact(): void {
    if (!this.newContactValue.trim()) return;

    const payload: ContactDto = {
      value: this.newContactValue.trim(),
      type: this.newContactType
    };

    this.contactService.addContact(payload).subscribe({
      next: (res) => {
        this.showMessage(res.message ?? 'Contact added successfully.', 'success');
        this.newContactValue = '';
        this.loadContacts();
      },
      error: () => {
        this.showMessage('Failed to add contact.', 'error');
      }
    });
  }

  verifyContact(contact: UserContactDto): void {
    if (!contact.id) return;

    this.verifyingContact = contact;
    this.verificationCode = '';

    this.contactService.requestVerification(contact.id).subscribe({
      next: (res) => {
        this.showMessage(res.message ?? 'Verification code sent.', 'success');
      },
      error: () => {
        this.showMessage('Failed to send verification code.', 'error');
      }
    });
  }

  confirmVerificationCode(): void {
    if (!this.verificationCode.trim()) return;

    this.contactService.confirmContactCode(this.verificationCode.trim()).subscribe({
      next: (res) => {
        this.showMessage(res.message ?? 'Contact verified successfully.', 'success');
        this.verifyingContact = null;
        this.verificationCode = '';
        this.loadContacts();
      },
      error: () => {
        this.showMessage('Invalid verification code.', 'error');
      }
    });
  }

  cancelVerification(): void {
    this.verifyingContact = null;
    this.verificationCode = '';
    this.message = null;
  }

  setPrimary(contact: UserContactDto): void {
    if (!contact.id) return;

    this.contactService.setPrimary(contact.id).subscribe({
      next: (res) => {
        this.showMessage(res.message ?? 'Contact set as primary.', 'success');
        this.loadContacts();
      },
      error: () => {
        this.showMessage('Failed to set contact as primary.', 'error');
      }
    });
  }

  deleteContact(contact: UserContactDto): void {
    if (!contact.id) return;

    this.contactToDelete = contact;
    this.showReauthModal = true;
    this.reauthPassword = '';
    this.reauthOtp = '';
    this.reauthError = null;
    this.reauthSuccess = null;
  }

  confirmReauthAndDelete(): void {
    if (!this.contactToDelete) return;

    this.reauthLoading = true;
    this.reauthError = null;
    this.reauthSuccess = null;

    this.authService.reauthenticate({
      password: this.reauthPassword || undefined,
      otp: this.reauthOtp || undefined
    }).subscribe({
      next: () => {
        this.contactService.deleteContact(this.contactToDelete!.id!).subscribe({
          next: (res) => {
            this.showMessage(res.message ?? 'Contact deleted successfully.', 'success');
            this.loadContacts();
            this.closeReauthModal();
          },
          error: () => {
            this.showMessage('Failed to delete contact.', 'error');
            this.closeReauthModal();
          }
        });
      },
      error: (err) => {
        this.reauthLoading = false;

        if (err.status === 401) {

          if (!this.reauthOtp) {
            this.reauthSuccess =
              'Please enter your active OTP code to confirm deletion.';
            return;
          }

          this.reauthError = 'Invalid verification code.';
          return;
        }

        this.reauthError = 'Reauthentication failed.';
      }
    });
  }

  closeReauthModal(): void {
    this.showReauthModal = false;
    this.contactToDelete = null;
    this.reauthPassword = '';
    this.reauthOtp = '';
    this.reauthLoading = false;
    this.reauthError = null;
    this.reauthSuccess = null;
  }

  getContactIcon(type: ContactDto.TypeEnum): string {
    return type === ContactDto.TypeEnum.Email
      ? 'bi-envelope-fill'
      : 'bi-telephone-fill';
  }

  isNewContactValid(): boolean {
    if (!this.newContactValue.trim()) {
      return false;
    }

    if (this.newContactType === ContactDto.TypeEnum.Email) {
      return this.emailRegex.test(this.newContactValue.trim());
    } else {
      return this.phoneRegex.test(this.newContactValue.trim());
    }
  }

  private showMessage(message: string, type: 'success' | 'error' | 'info'): void {
    this.message = message;
    this.messageType = type;

    setTimeout(() => {
      this.message = null;
    }, 5000);
  }
}
