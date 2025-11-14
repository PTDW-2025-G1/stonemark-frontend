import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-change-email-success',
  standalone: true,
  templateUrl: './change-email-success.html'
})
export class ChangeEmailSuccessComponent {
  @Input() newEmail: string = '';
  @Output() openEmail = new EventEmitter<void>();
  @Output() backToProfile = new EventEmitter<void>();

  onOpenEmail() {
    this.openEmail.emit();
  }

  onBackToProfile() {
    this.backToProfile.emit();
  }
}
