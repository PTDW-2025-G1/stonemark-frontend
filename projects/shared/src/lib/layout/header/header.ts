import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { AccountService } from '@core/services/account/account.service';
import { UserDto } from '@api/model/user-dto';
import { Subscription } from 'rxjs';
import {environment} from '@env/environment';
import {ButtonComponent} from '@shared/ui/button/button';
import {LanguageSelectorComponent} from '@shared/ui/language-selector/language-selector';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, LanguageSelectorComponent, TranslateModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header implements OnInit, OnDestroy {
  isMenuOpen = false;
  isDropdownOpen = false;
  user: UserDto | null = null;
  isHeaderVisible = true;
  isAuthLoading = true;
  private lastScrollY = 0;
  private scrollThreshold = 100;
  private authSubscription?: Subscription;

  menuItems = [
    { labelKey: 'header.nav.monuments', route: `${environment.baseUrl}/search/monuments` },
    { labelKey: 'header.nav.marks', route: `${environment.baseUrl}/search/marks` },
    { labelKey: 'header.nav.contribute', route: `${environment.baseUrl}/contribute` },
    { labelKey: 'header.nav.discover', route: `${environment.baseUrl}/discover` },
    { labelKey: 'header.nav.about', route: `${environment.baseUrl}/about` },
  ];

  constructor(protected authService: AuthService, private profileService: AccountService) {}

  ngOnInit(): void {
    const hasToken = this.authService.getAccessToken();

    if (hasToken) {
      this.loadUser();
    } else {
      this.isAuthLoading = false;
    }

    this.authSubscription = this.authService.authState$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.loadUser();
      } else {
        this.user = null;
        this.isAuthLoading = false;
      }
    });

    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  private loadUser(): void {
    this.profileService.getCurrentUser().subscribe({
      next: user => {
        this.user = user;
        this.isAuthLoading = false;
      },
      error: () => {
        this.user = null;
        this.isAuthLoading = false;
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  onHome(): void {
    window.location.href = environment.baseUrl;
  }

  onLogin(): void {
    window.location.href = `${environment.authUrl}/login`;
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => (window.location.href = `${environment.authUrl}/login`),
      error: () => (window.location.href = `${environment.authUrl}/login`)
    });
  }

  goToProfile(): void {
    this.isDropdownOpen = false;
    window.location.href = `${environment.profileUrl}/profile`;
  }

  goToBookmarks(): void {
    this.isDropdownOpen = false;
    window.location.href = `${environment.profileUrl}/bookmarks`;
  }

  isActiveRoute(route: string): boolean {
    const currentPath = window.location.pathname;
    try {
      const url = new URL(route);
      const routePath = url.pathname;
      return currentPath.indexOf(routePath) === 0 || currentPath === routePath;
    } catch {
      const routePath = route.replace(environment.baseUrl, '');
      return currentPath.indexOf(routePath) === 0 || currentPath === routePath;
    }
  }

  private handleScroll(): void {
    const currentScrollY = window.scrollY;

    if (currentScrollY < this.scrollThreshold) {
      this.isHeaderVisible = true;
      this.lastScrollY = currentScrollY;
      return;
    }

    if (currentScrollY > this.lastScrollY) {
      this.isHeaderVisible = false;
      this.closeMenu();
      this.isDropdownOpen = false;
    } else if (currentScrollY < this.lastScrollY) {
      this.isHeaderVisible = true;
    }
    this.lastScrollY = currentScrollY;
  }
}
