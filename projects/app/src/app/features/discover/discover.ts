import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from '@shared/ui/button/button';
import {RouterLink} from '@angular/router';
import {DiscoverHeroSectionComponent} from '@features/discover/sections/discover-hero-section/discover-hero-section';
import {DiscoverFeaturesSectionComponent} from '@features/discover/sections/discover-features-section/discover-features-section';
import {DiscoverWhyItMattersSection} from '@features/discover/sections/discover-why-it-matters-section/discover-why-it-matters-section';
import {DiscoverProcessLoopSectionComponent} from '@features/discover/sections/discover-process-loop-section/discover-process-loop-section';
import {DiscoverGalleryLoopSectionComponent} from '@features/discover/sections/discover-gallery-loop-section/discover-gallery-loop-section';
import {
  DiscoverInterMarksSectionComponent
} from '@features/discover/sections/discover-inter-marks-section/discover-inter-marks-section';
import {
  DiscoverContributionSectionComponent
} from '@features/discover/sections/discover-contribution-section/discover-contribution-section';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink, DiscoverHeroSectionComponent, DiscoverFeaturesSectionComponent, DiscoverWhyItMattersSection, DiscoverProcessLoopSectionComponent, DiscoverGalleryLoopSectionComponent, DiscoverInterMarksSectionComponent, DiscoverContributionSectionComponent],
  templateUrl: './discover.html',
})
export class DiscoverPageComponent {}
