import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-change-telephone-success',
  standalone: true,
  templateUrl: './change-telephone-success.html'
})
export class ChangeTelephoneSuccessComponent {
  @Input() newTelephone: string = '';
  @Output() backToProfile = new EventEmitter<void>();

  onBackToProfile() {
    this.backToProfile.emit();
  }
}
