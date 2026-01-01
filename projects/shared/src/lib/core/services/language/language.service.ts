import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from '@core/services/cookie/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly COOKIE_KEY = 'preferredLanguage';
  private readonly COOKIE_EXPIRY_DAYS = 365;
  private readonly DEFAULT_LANG = 'pt';
  private readonly AVAILABLE_LANGS = ['en', 'pt'];

  constructor(
    private translate: TranslateService,
    private cookieService: CookieService
  ) {}

  initialize(): void {
    this.translate.addLangs(this.AVAILABLE_LANGS);
    this.translate.setDefaultLang(this.DEFAULT_LANG);

    const savedLang = this.getSavedLanguage();
    const browserLang = this.translate.getBrowserLang();

    if (savedLang && this.AVAILABLE_LANGS.includes(savedLang)) {
      this.translate.use(savedLang);
    } else if (browserLang?.match(/en|pt/)) {
      this.translate.use(browserLang);
    } else {
      this.translate.use(this.DEFAULT_LANG);
    }
  }

  changeLanguage(lang: string): void {
    if (!this.AVAILABLE_LANGS.includes(lang)) {
      console.warn(`Language ${lang} is not supported`);
      return;
    }

    this.translate.use(lang);
    this.saveLanguage(lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.translate.defaultLang || this.DEFAULT_LANG;
  }

  getAvailableLanguages(): string[] {
    return [...this.AVAILABLE_LANGS];
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

