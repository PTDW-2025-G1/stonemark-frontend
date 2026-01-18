import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroSectionComponent} from '@features/about/sections/hero-section/hero-section';
import {MissionSectionComponent} from '@features/about/sections/mission-section/mission-section';
import {VideoSectionComponent} from '@features/about/sections/video-section/video-section';
import {FeaturesSectionComponent} from '@features/about/sections/features-section/features-section';
import {PartnerSectionComponent} from '@features/about/sections/partner-section/partner-section';
import {UnescoSectionComponent} from '@features/about/sections/unesco-section/unesco-section';
import {CtaSectionComponent} from '@features/about/sections/cta-section/cta-section';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, HeroSectionComponent, MissionSectionComponent, VideoSectionComponent, FeaturesSectionComponent, PartnerSectionComponent, UnescoSectionComponent, CtaSectionComponent],
  templateUrl: './about.html'
})
export class AboutComponent {}
