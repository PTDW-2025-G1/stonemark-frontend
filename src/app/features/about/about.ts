import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroSectionComponent} from '@features/about/sections/hero-section';
import {MissionSectionComponent} from '@features/about/sections/mission-section';
import {FeaturesSectionComponent} from '@features/about/sections/features-section';
import {PartnerSectionComponent} from '@features/about/sections/partner-section';
import {UnescoSectionComponent} from '@features/about/sections/unesco-section';
import {CtaSectionComponent} from '@features/about/sections/cta-section';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, HeroSectionComponent, MissionSectionComponent, FeaturesSectionComponent, PartnerSectionComponent, UnescoSectionComponent, CtaSectionComponent],
  templateUrl: './about.html'
})
export class AboutComponent {}
