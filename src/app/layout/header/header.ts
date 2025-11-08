import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {ButtonComponent} from '@shared/ui/button/button';
import { AuthService } from '@core/services/auth.service';
import { ProfileService, UserDto } from '@core/services/profile.service';
import { Subscription } from 'rxjs';

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
    { label: 'Monuments', route: '/monuments' },
    { label: 'Marks', route: '/marks' },
    { label: 'About', route: '/about' },
    { label: 'Contact', route: '/contact' }
  ];

  constructor(protected authService: AuthService, private profileService: ProfileService, private router: Router) {}

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

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }

  goToProfile(): void {
    this.isDropdownOpen = false;
    this.router.navigate(['/profile']);
  }
}
