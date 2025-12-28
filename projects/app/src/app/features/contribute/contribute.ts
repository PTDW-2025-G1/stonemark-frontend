import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroSectionComponent} from '@features/contribute/sections/hero-section';
import {TrustIndicatorsComponent} from '@features/contribute/sections/trust-indicators';
import {HowItWorksComponent} from '@features/contribute/sections/how-it-works';
import {PrivacySectionComponent} from '@features/contribute/sections/privacy-section';
import {CallToActionComponent} from '@features/contribute/sections/cta-section';

@Component({
  selector: 'app-contribute',
  standalone: true,
  imports: [CommonModule, HeroSectionComponent, TrustIndicatorsComponent, HowItWorksComponent, PrivacySectionComponent, CallToActionComponent],
  templateUrl: './contribute.html'
})
export class ContributeComponent {}
