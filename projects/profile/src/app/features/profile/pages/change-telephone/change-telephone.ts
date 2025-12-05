import { Component } from '@angular/core';
import { ChangeTelephoneFormComponent } from './sections/change-telephone-form/change-telephone-form';

@Component({
  selector: 'app-change-telephone',
  standalone: true,
  imports: [ChangeTelephoneFormComponent],
  templateUrl: './change-telephone.html'
})
export class ChangeTelephoneComponent {}
