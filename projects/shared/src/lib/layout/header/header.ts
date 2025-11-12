import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ButtonComponent} from '@shared/ui/button/button';
import { AuthService } from '@core/services/auth.service';
import { ProfileService, UserDto } from '@core/services/profile.service';
import { Subscription } from 'rxjs';
import {environment} from '@env/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header implements OnInit, OnDestroy {
  isMenuOpen = false;
  isDropdownOpen = false;
  user: UserDto | null = null;
  private authSubscription?: Subscription;

  menuItems = [
    { label: 'Monuments', route: `${environment.baseUrl}/monuments` },
    { label: 'Marks', route: `${environment.baseUrl}/marks` },
    { label: 'About', route: `${environment.baseUrl}/about` },
    { label: 'Contact', route: `${environment.baseUrl}/contact` }
  ];

  constructor(protected authService: AuthService, private profileService: ProfileService) {}

  ngOnInit(): void {
    if (this.authService.getAccessToken()) {
      this.loadUser();
    }

    this.authSubscription = this.authService.authState$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.loadUser();
      } else {
        this.user = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  private loadUser(): void {
    this.profileService.getCurrentUser().subscribe({
      next: user => (this.user = user),
      error: () => (this.user = null)
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
}
