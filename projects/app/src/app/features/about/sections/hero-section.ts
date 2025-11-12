import { Component } from '@angular/core';
import {SharedHeroSectionComponent} from '../../../../../projects/shared/src/lib/shared/ui/hero-section/hero-section';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    SharedHeroSectionComponent
  ],
  template: `
    <app-shared-hero
      [icon]="'bi bi-info-circle'"
      [badge]="'About the Project'"
      [titleLines]="['Preserving History,', 'One Mark at a Time']"
      [subtitle]="'Stone Mark is a web application dedicated to the documentation and exploration of stonemason marks - the unique symbols engraved by ancient craftsmen on monuments across history.'"
    ></app-shared-hero>
  `
})
export class HeroSectionComponent {}
