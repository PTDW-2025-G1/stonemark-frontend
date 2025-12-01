import {Component, OnInit, signal} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from 'projects/shared/src/lib/layout/header/header';
import { Footer } from 'projects/shared/src/lib/layout/footer/footer';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrollToTopComponent } from '@shared/ui/scroll-top/scroll-top';
import {CookieService} from '@core/services/cookie.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, MatSnackBarModule, ScrollToTopComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('stonemark-frontend');

  constructor(router: Router, private cookies: CookieService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    const saved = this.cookies.get('a11y_settings');
    if (saved) {
      const settings = JSON.parse(saved);
      Object.entries(settings).forEach(([id, enabled]) => {
        document.body.classList.toggle(
          id.replace(/([A-Z])/g, "-$1").toLowerCase(),
          Boolean(enabled)
        );
      });
    }
  }

}
