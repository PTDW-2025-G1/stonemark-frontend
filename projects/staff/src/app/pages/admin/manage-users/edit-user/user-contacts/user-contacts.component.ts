import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserContactService } from '@core/services/contact/user-contact.service';
import { UserContactDto } from '@api/model/user-contact-dto';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-user-contacts',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, DialogModule, InputTextModule, Select, FormsModule, ConfirmDialogModule, ToastModule, ToggleSwitch, CardModule],
  templateUrl: './user-contacts.component.html',
  providers: [ConfirmationService, MessageService]
})
export class UserContactsComponent implements OnInit {
  @Input() userId!: number;
  @Output() contactsChanged = new EventEmitter<void>();
  contacts: UserContactDto[] = [];
  displayDialog = false;
  selectedContact: UserContactDto = { type: 'EMAIL', value: '', primary: false, verified: false };
  contactTypes = Object.values(UserContactDto.TypeEnum).map(value => ({ label: value, value }));

  constructor(
    private userContactService: UserContactService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.userId) {
      this.loadContacts();
    }
  }

  loadContacts(): void {
    this.userContactService.getContacts(this.userId).subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  showAddDialog(): void {
    this.selectedContact = { type: 'EMAIL', value: '', primary: false, verified: false };
    this.displayDialog = true;
  }

  showEditDialog(contact: UserContactDto): void {
    this.selectedContact = { ...contact };
    this.displayDialog = true;
  }

  saveContact(): void {
    if (this.selectedContact.id) {
      this.userContactService.updateContact(this.userId, this.selectedContact.id, this.selectedContact).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contact updated' });
        this.loadContacts();
        this.displayDialog = false;
        this.contactsChanged.emit();
      });
    } else {
      this.userContactService.addContact(this.userId, this.selectedContact).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contact added' });
        this.loadContacts();
        this.displayDialog = false;
        this.contactsChanged.emit();
      });
    }
  }

  deleteContact(contact: UserContactDto): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this contact?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if(contact.id) {
          this.userContactService.deleteContact(this.userId, contact.id).subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contact deleted' });
            this.loadContacts();
            this.contactsChanged.emit();
          });
        }
      }
    });
  }
}
