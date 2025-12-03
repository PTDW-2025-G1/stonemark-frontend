import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ButtonComponent} from '@shared/ui/button/button';
import { ProfileService } from '@core/services/profile/profile.service';
import {environment} from '@env/environment';
import { KeycloakService } from 'projects/app/src/app/services/keycloak/keycloak.service'; // Adjust path as needed
import { UserProfile } from 'projects/app/src/app/services/keycloak/user-profile'; // Adjust path as needed

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
  user: UserProfile | null = null;

  menuItems = [
    { label: 'Monuments', route: `${environment.baseUrl}/search/monuments` },
    { label: 'Marks', route: `${environment.baseUrl}/search/marks` },
    { label: 'About', route: `${environment.baseUrl}/about` },
    { label: 'Contact', route: `${environment.baseUrl}/contact` },
  ];

  constructor(public keycloakService: KeycloakService, private profileService: ProfileService) {}

  ngOnInit(): void {
    if (this.keycloakService.keycloak.authenticated) {
      this.user = this.keycloakService.profile || null;
    }
  }

  ngOnDestroy(): void { }

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
    this.keycloakService.login().then(r => {});
  }

  onLogout(): void {
    this.keycloakService.logout().then(r => {});
  }

  goToProfile(): void {
    this.isDropdownOpen = false;
    this.keycloakService.keycloak.accountManagement().then(r => {});
  }

  goToBookmarks(): void {
    this.isDropdownOpen = false;
    window.location.href = `${environment.profileUrl}/bookmarks`;
  }
}
