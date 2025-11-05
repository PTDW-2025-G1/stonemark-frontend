import { Component, signal } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {Header} from '@layout/header/header';
import {Footer} from '@layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
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
