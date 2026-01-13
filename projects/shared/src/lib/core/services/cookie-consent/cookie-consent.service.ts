import { Injectable, signal } from '@angular/core';
import { CookieService } from '../cookie/cookie.service';

export type CookieConsentStatus = 'pending' | 'accepted' | 'rejected';

export interface CookieConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  private readonly CONSENT_COOKIE_NAME = 'cookieConsent';
  private readonly PREFERENCES_COOKIE_NAME = 'cookiePreferences';
  private readonly COOKIE_EXPIRY_DAYS = 365;

  private consentStatusSignal = signal<CookieConsentStatus>('pending');
  private preferencesSignal = signal<CookieConsentPreferences>(this.getDefaultPreferences());
  private showBannerSignal = signal<boolean>(false);

  get consentStatus() {
    return this.consentStatusSignal.asReadonly();
  }

  get preferences() {
    return this.preferencesSignal.asReadonly();
  }

  get showBanner() {
    return this.showBannerSignal.asReadonly();
  }

  constructor(private cookieService: CookieService) {
    this.loadSavedConsent();
  }

  private loadSavedConsent(): void {
    const savedConsent = this.cookieService.get(this.CONSENT_COOKIE_NAME);
    const savedPreferences = this.cookieService.get(this.PREFERENCES_COOKIE_NAME);

    if (savedConsent) {
      this.consentStatusSignal.set(savedConsent as CookieConsentStatus);
    }

    if (savedPreferences) {
      try {
        const prefs = JSON.parse(savedPreferences);
        this.preferencesSignal.set(prefs);
      } catch (e) {
        console.error('Failed to parse cookie preferences', e);
      }
    }
  }

  acceptAll(): void {
    const preferences: CookieConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };

    this.saveConsent('accepted', preferences);
  }

  rejectAll(): void {
    const preferences: CookieConsentPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };

    this.saveConsent('rejected', preferences);
    this.clearOptionalCookies();
  }

  saveCustomPreferences(preferences: Partial<CookieConsentPreferences>): void {
    const fullPreferences: CookieConsentPreferences = {
      ...this.getDefaultPreferences(),
      ...preferences,
      necessary: true
    };

    const status: CookieConsentStatus =
      fullPreferences.analytics || fullPreferences.marketing || fullPreferences.preferences
        ? 'accepted'
        : 'rejected';

    this.saveConsent(status, fullPreferences);
  }

  isAllowed(type: keyof CookieConsentPreferences): boolean {
    return this.preferencesSignal()[type];
  }

  hasConsent(): boolean {
    return this.consentStatusSignal() !== 'pending';
  }

  resetConsent(): void {
    this.cookieService.delete(this.CONSENT_COOKIE_NAME);
    this.cookieService.delete(this.PREFERENCES_COOKIE_NAME);
    this.consentStatusSignal.set('pending');
    this.preferencesSignal.set(this.getDefaultPreferences());
    this.clearOptionalCookies();

    this.showBannerSignal.set(true);
  }

  public hideBanner(): void {
    this.showBannerSignal.set(false);
  }

  private saveConsent(status: CookieConsentStatus, preferences: CookieConsentPreferences): void {
    this.cookieService.set(this.CONSENT_COOKIE_NAME, status, this.COOKIE_EXPIRY_DAYS);
    this.cookieService.set(
      this.PREFERENCES_COOKIE_NAME,
      JSON.stringify(preferences),
      this.COOKIE_EXPIRY_DAYS
    );

    this.consentStatusSignal.set(status);
    this.preferencesSignal.set(preferences);
  }

  private clearOptionalCookies(): void {
    const cookiesToClear = [
      '_ga', '_gid', '_gat',
      'fbp', 'fr',
      'a11y_settings',
      'preferredLanguage',
    ];

    cookiesToClear.forEach(cookieName => {
      this.cookieService.delete(cookieName);
    });
  }

  private getDefaultPreferences(): CookieConsentPreferences {
    return {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
  }
}

