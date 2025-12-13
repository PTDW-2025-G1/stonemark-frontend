import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountContactService } from '@core/services/account-contact/account-contact.service';
import { UserContactDto } from '@api/model/user-contact-dto';
import { ContactDto } from '@api/model/contact-dto';

@Component({
  selector: 'app-account-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account-contacts.html'
})
export class AccountContactsComponent implements OnInit {
  contacts: UserContactDto[] = [];

  newContactValue = '';
  newContactType: ContactDto.TypeEnum = ContactDto.TypeEnum.Email;

  verifyingContact: UserContactDto | null = null;
  verificationCode = '';

  message: string | null = null;
  messageType: 'success' | 'error' | 'info' = 'info';

  protected readonly ContactDto = ContactDto;

  constructor(private contactService: AccountContactService) {}

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

    this.contactService.confirmContactCode(this.verificationCode).subscribe({
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

    if (!confirm(`Are you sure you want to delete ${contact.value}?`)) {
      return;
    }

    this.contactService.deleteContact(contact.id).subscribe({
      next: (res) => {
        this.showMessage(res.message ?? 'Contact deleted successfully.', 'success');
        this.loadContacts();
      },
      error: () => {
        this.showMessage('Failed to delete contact.', 'error');
      }
    });
  }

  getContactIcon(type: ContactDto.TypeEnum): string {
    return type === ContactDto.TypeEnum.Email ? 'bi-envelope-fill' : 'bi-telephone-fill';
  }

  private showMessage(message: string, type: 'success' | 'error' | 'info'): void {
    this.message = message;
    this.messageType = type;

    setTimeout(() => {
      this.message = null;
    }, 5000);
  }
}
