import { Injectable, inject } from '@angular/core';
import { CookieService } from '@core/services/cookie/cookie.service';
import { CookieConsentService } from '@core/services/cookie-consent/cookie-consent.service';

@Injectable({ providedIn: 'root' })
export class AccessibilityService {
  private cookies = inject(CookieService);
  private cookieConsent = inject(CookieConsentService);

  applySavedSettings(): void {
    if (!this.cookieConsent.isAllowed('preferences')) {
      return;
    }

    const saved = this.cookies.get('a11y_settings');
    if (!saved) return;

    let settings: Record<string, boolean>;

    try {
      settings = JSON.parse(saved);
    } catch {
      return;
    }

    Object.entries(settings).forEach(([id, enabled]) => {
      const cssClass = id.replace(/([A-Z])/g, "-$1").toLowerCase();
      document.body.classList.toggle(cssClass, enabled);
    });
  }

  public saveSettings(settings: Record<string, boolean>): void {
    if (!this.cookieConsent.isAllowed('preferences')) {
      console.warn('Cannot save accessibility settings: user has not consented to preference cookies'); // pbbly i should change this to a modal... but im to lazy
      return;
    }

    this.cookies.set('a11y_settings', JSON.stringify(settings), 365);
  }
}
