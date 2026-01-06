import { Component } from '@angular/core';
import { SharedHeroSectionComponent } from '@shared/ui/hero-section/hero-section';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-hero-section',
  standalone: true,
  imports: [
    SharedHeroSectionComponent,
    TranslateModule
  ],
  template: `
    <app-shared-hero
      [icon]="'bi bi-envelope'"
      [badge]="'contact.hero.badge' | translate"
      [titleLines]="[('contact.hero.title' | translate)]"
      [subtitle]="'contact.hero.subtitle' | translate"
    ></app-shared-hero>
  `
})
export class ContactHeroSectionComponent {}
