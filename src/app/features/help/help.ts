import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';
import {HeroSectionComponent} from '@features/help/sections/hero-section';
import {TrustIndicatorsComponent} from '@features/help/sections/trust-indicators';
import {HowItWorksComponent} from '@features/help/sections/how-it-works';
import {FeaturesSectionComponent} from '@features/help/sections/features-section';
import {PrivacySectionComponent} from '@features/help/sections/privacy-section';
import {CallToActionComponent} from '@features/help/sections/cta-section';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, RouterLink, HeroSectionComponent, TrustIndicatorsComponent, HowItWorksComponent, FeaturesSectionComponent, PrivacySectionComponent, CallToActionComponent],
  templateUrl: './help.html'
})
export class HelpComponent {}
