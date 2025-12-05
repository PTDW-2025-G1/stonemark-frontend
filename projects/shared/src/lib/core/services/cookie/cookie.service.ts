import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  set(name: string, value: string, days: number): void {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    const domain = this.getDomain();
    document.cookie = name + '=' + (value || '')  + expires + '; path=/; domain=' + domain;
  }

  get(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  delete(name: string): void {
    const domain = this.getDomain();
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Max-Age=-99999999; path=/; domain=' + domain;
  }

  private getDomain(): string {
    const hostname = window.location.hostname;
    if (hostname === 'localhost') {
      return 'localhost';
    }
    const parts = hostname.split('.');
    if (parts.length > 2) {
      return '.' + parts.slice(-2).join('.');
    }
    return hostname;
  }
}
