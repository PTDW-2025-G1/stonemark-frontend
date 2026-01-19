import {Component, signal, ViewChild, AfterViewInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {Header} from 'projects/shared/src/lib/layout/header/header';
import {Footer} from 'projects/shared/src/lib/layout/footer/footer';
import { LanguageService } from '@core/services/language/language.service';
import { CookieConsentBannerComponent } from '@shared/ui/cookie-consent-banner/cookie-consent-banner.component';
import { ToastComponent } from '@shared/ui/toast/toast';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CookieConsentBannerComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  protected readonly title = signal('stonemark-frontend');

  constructor(
    router: Router,
    private languageService: LanguageService,
    private notificationService: NotificationService
  ) {
    this.languageService.initialize();

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngAfterViewInit(): void {
    this.notificationService.registerToastComponent(this.toastComponent);
  }
}
