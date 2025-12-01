import {Component, OnInit, signal} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {Header} from 'projects/shared/src/lib/layout/header/header';
import {Footer} from 'projects/shared/src/lib/layout/footer/footer';
import {ScrollToTopComponent} from '@shared/ui/scroll-top/scroll-top';
import {CookieService} from '@core/services/cookie.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ScrollToTopComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('stonemark-frontend');

  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

}
