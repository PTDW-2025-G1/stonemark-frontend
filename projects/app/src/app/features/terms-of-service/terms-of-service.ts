import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {TermsSectionGrid} from '@features/terms-of-service/sections/sections-grid/terms-section-grid';
import {LegalHeroHeaderComponent} from '@shared/ui/legal-hero-header/legal-hero-header';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [CommonModule, TermsSectionGrid, LegalHeroHeaderComponent],
  templateUrl: './terms-of-service.html',
})
export class TermsOfServiceComponent {}
