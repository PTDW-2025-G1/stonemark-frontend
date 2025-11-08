import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {ButtonComponent} from '@shared/ui/button/button';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  isMenuOpen = false;

  menuItems = [
    { label: 'Monuments', route: '/monuments' },
    { label: 'Marks', route: '/marks' },
    { label: 'About', route: '/about' },
    { label: 'Contact', route: '/contact' }
  ];

  constructor(protected authService: AuthService, private router: Router) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
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
}
