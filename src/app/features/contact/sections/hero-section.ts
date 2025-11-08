import { Component } from '@angular/core';
import { SharedHeroSectionComponent } from '@shared/ui/hero-section/hero-section';

@Component({
  selector: 'app-contact-hero-section',
  standalone: true,
  imports: [
    SharedHeroSectionComponent
  ],
  template: `
    <app-shared-hero
      [icon]="'bi bi-envelope'"
      [badge]="'Get in Touch'"
      [titleLines]="['We Would Love to Hear from You.']"
      [subtitle]="'Have questions about Stone Mark? Want to collaborate or report an issue? We are here to help preserve history together.'"
    ></app-shared-hero>
  `
})
export class ContactHeroSectionComponent {}
