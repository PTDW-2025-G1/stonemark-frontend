import { Injectable, inject } from '@angular/core';
import { CookieService } from '@core/services/cookie/cookie.service';

@Injectable({ providedIn: 'root' })
export class AccessibilityService {
  private cookies = inject(CookieService);

  applySavedSettings(): void {
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
      document.body.classList.toggle(cssClass, !!enabled);
    });
  }
}
