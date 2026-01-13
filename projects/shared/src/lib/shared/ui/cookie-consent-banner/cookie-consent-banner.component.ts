import { Component, OnInit, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CookieConsentService, CookieConsentPreferences } from '@core/services/cookie-consent/cookie-consent.service';

@Component({
  selector: 'app-cookie-consent-banner',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './cookie-consent-banner.component.html'
})
export class CookieConsentBannerComponent implements OnInit {
  showDetails = signal(false);

  preferences = signal<CookieConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  constructor(private cookieConsentService: CookieConsentService) {
    effect(() => {
      if (this.showBanner()) {
        this.lockBodyScroll();
      } else {
        this.unlockBodyScroll();
      }
    });
  }

  get showBanner() {
    return this.cookieConsentService.showBanner;
  }

  ngOnInit(): void {
    if (!this.cookieConsentService.hasConsent()) {
      this.cookieConsentService.resetConsent();
    }
  }

  public acceptAll(): void {
    this.preferences.set({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    });

    this.cookieConsentService.acceptAll();
    this.hideBanner();
  }

  public rejectAll(): void {
    this.preferences.set({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    });

    this.cookieConsentService.rejectAll();
    this.hideBanner();
  }

  public toggleDetails(): void {
    this.showDetails.update(v => !v);
  }

  public savePreferences(): void {
    this.cookieConsentService.saveCustomPreferences(this.preferences());
    this.hideBanner();
  }

  public updatePreference(key: keyof CookieConsentPreferences, value: boolean): void {
    if (key === 'necessary') return;

    this.preferences.update(prefs => ({
      ...prefs,
      [key]: value
    }));
  }

  private hideBanner(): void {
    this.showDetails.set(false);
    this.cookieConsentService.hideBanner();
  }

  private lockBodyScroll(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  private unlockBodyScroll(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }
}

