import { Component } from '@angular/core';
import { ChangeEmailFormComponent } from './sections/change-email-form/change-email-form';

@Component({
  selector: 'app-change-email',
  standalone: true,
  imports: [ChangeEmailFormComponent],
  templateUrl: './change-email.html'
})
export class ChangeEmailComponent {}
