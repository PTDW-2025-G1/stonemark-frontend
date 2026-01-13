import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CookieConsentService } from '@core/services/cookie-consent/cookie-consent.service';
import { ButtonComponent } from '@shared/ui/button/button';

@Component({
  selector: 'app-cookie-settings-button',
  standalone: true,
  imports: [TranslateModule, ButtonComponent],
  template: `
    <app-button
      (click)="openCookieSettings()"
      variant="outline"
      size="sm"
      type="button"
      [attr.aria-label]="'cookie_settings.aria_label' | translate">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="currentColor"
        viewBox="0 0 16 16"
        class="inline-block -mt-0.5">
        <path d="M6 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm4.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-.5 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
        <path d="M8 0a7.963 7.963 0 0 0-4.075 1.114c-.162.09-.25.255-.25.423v.917c0 .346.192.662.496.801A6.03 6.03 0 0 1 8 5.5a6.03 6.03 0 0 1 3.829-2.245c.304-.139.496-.455.496-.801v-.917c0-.168-.088-.333-.25-.423A7.963 7.963 0 0 0 8 0Zm0 6.5c-1.75 0-3.375.5-4.75 1.378v1.917c0 .166.084.323.22.414A8.932 8.932 0 0 0 8 11.5a8.932 8.932 0 0 0 4.53-1.291.503.503 0 0 0 .22-.414v-1.917C11.375 7 9.75 6.5 8 6.5Zm4.75 5.378v1.917c0 .166-.084.323-.22.414A8.932 8.932 0 0 1 8 15.5a8.932 8.932 0 0 1-4.53-1.291.503.503 0 0 1-.22-.414v-1.917C4.625 13 6.25 13.5 8 13.5s3.375-.5 4.75-1.622Z"/>
      </svg>
      {{ 'cookie_settings.button_text' | translate }}
    </app-button>
  `
})
export class CookieSettingsButtonComponent {
  constructor(private cookieConsentService: CookieConsentService) {}

  openCookieSettings(): void {
    this.cookieConsentService.resetConsent();
  }
}

