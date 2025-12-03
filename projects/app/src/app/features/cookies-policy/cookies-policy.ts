import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {TypesOfCookiesSection} from '@features/cookies-policy/sections/types-of-cookies-section/types-of-cookies-section';
import {ThirdPartyCookiesSection} from '@features/cookies-policy/sections/third-party-cookies-sections/third-party-cookies-section';
import {ManagingCookiePreferencesSection} from '@features/cookies-policy/sections/cookie-preferences-section/cookie-preferences-section';
import {CookieRetentionSection} from '@features/cookies-policy/sections/cookie-retention-section/cookie-retention-section';
import {QuestionsAboutCookiesSection} from '@features/cookies-policy/sections/questions-about-cookies-section/questions-about-cookies-section';
import {LegalHeroHeaderComponent} from '@shared/ui/legal-hero-header/legal-hero-header';
import {LegalSectionBlockComponent} from '@shared/ui/legal-section-block/legal-section-block';

@Component({
  selector: 'app-cookies-policy',
  standalone: true,
  imports: [CommonModule, RouterModule, TypesOfCookiesSection, ThirdPartyCookiesSection, ManagingCookiePreferencesSection, CookieRetentionSection, QuestionsAboutCookiesSection, LegalHeroHeaderComponent, LegalSectionBlockComponent],
  templateUrl: './cookies-policy.html'
})
export class CookiesPolicyComponent {}
