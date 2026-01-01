import {Component, signal} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from 'projects/shared/src/lib/layout/header/header';
import { Footer } from 'projects/shared/src/lib/layout/footer/footer';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrollToTopComponent } from '@shared/ui/scroll-top/scroll-top';
import { LanguageService } from '@core/services/language/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, MatSnackBarModule, ScrollToTopComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('stonemark-frontend');

  constructor(router: Router, private languageService: LanguageService) {
    this.languageService.initialize();

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

}
