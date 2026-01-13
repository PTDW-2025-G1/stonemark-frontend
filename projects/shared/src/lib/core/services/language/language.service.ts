import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from '@core/services/cookie/cookie.service';
import { CookieConsentService } from '@core/services/cookie-consent/cookie-consent.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly COOKIE_KEY = 'preferredLanguage';
  private readonly COOKIE_EXPIRY_DAYS = 365;
  private readonly DEFAULT_LANG = 'en';
  private readonly AVAILABLE_LANGS = ['en', 'pt'];

  constructor(
    private translate: TranslateService,
    private cookieService: CookieService,
    private cookieConsent: CookieConsentService
  ) {}

  initialize(): void {
    this.translate.addLangs(this.AVAILABLE_LANGS);
    this.translate.setFallbackLang(this.DEFAULT_LANG);

    if (this.cookieConsent.isAllowed('preferences')) {
      const savedLang = this.getSavedLanguage();
      if (savedLang && this.AVAILABLE_LANGS.includes(savedLang)) {
        this.translate.use(savedLang);
        return;
      }
    }
    this.translate.use(this.DEFAULT_LANG);
  }

  changeLanguage(lang: string): void {
    if (!this.AVAILABLE_LANGS.includes(lang)) {
      console.warn(`Language ${lang} is not supported`);
      return;
    }

    this.translate.use(lang);

    if (this.cookieConsent.isAllowed('preferences')) {
      this.saveLanguage(lang);
    } else {
      console.info('Language changed but not saved: preference cookies not accepted');
    }
  }

  getCurrentLanguage(): string {
    return this.translate.getCurrentLang() || this.translate.getFallbackLang() || this.DEFAULT_LANG;
  }

  get onLangChange() {
    return this.translate.onLangChange;
  }

  private saveLanguage(lang: string): void {
    try {
      this.cookieService.set(this.COOKIE_KEY, lang, this.COOKIE_EXPIRY_DAYS);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  }

  private getSavedLanguage(): string | null {
    try {
      return this.cookieService.get(this.COOKIE_KEY);
    } catch (error) {
      console.error('Failed to retrieve language preference:', error);
      return null;
    }
  }

  instant(key: string | string[], interpolateParams?: Object): string | any {
    return this.translate.instant(key, interpolateParams);
  }

  get(key: string | string[], interpolateParams?: Object) {
    return this.translate.get(key, interpolateParams);
  }

}

