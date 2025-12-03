import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {CookieHeroSection} from '@features/cookies-policy/sections/hero-section/hero-section';
import {CookieIntroductionSection} from '@features/cookies-policy/sections/introduction-section/introduction-section';
import {WhatAreCookiesSection} from '@features/cookies-policy/sections/what-are-cookies-section/what-are-cookies-section';
import {TypesOfCookiesSection} from '@features/cookies-policy/sections/types-of-cookies-section/types-of-cookies-section';
import {ThirdPartyCookiesSection} from '@features/cookies-policy/sections/third-party-cookies-sections/third-party-cookies-section';
import {ManagingCookiePreferencesSection} from '@features/cookies-policy/sections/cookie-preferences-section/cookie-preferences-section';
import {CookieRetentionSection} from '@features/cookies-policy/sections/cookie-retention-section/cookie-retention-section';
import {UpdatesPolicySection} from '@features/cookies-policy/sections/updates-policy-section/updates-policy-section';
import {QuestionsAboutCookiesSection} from '@features/cookies-policy/sections/questions-about-cookies-section/questions-about-cookies-section';

@Component({
  selector: 'app-cookies-policy',
  standalone: true,
  imports: [CommonModule, RouterModule, CookieHeroSection, CookieIntroductionSection, WhatAreCookiesSection, TypesOfCookiesSection, ThirdPartyCookiesSection, ManagingCookiePreferencesSection, CookieRetentionSection, UpdatesPolicySection, QuestionsAboutCookiesSection],
  templateUrl: './cookies-policy.html'
})
export class CookiesPolicyComponent {}
