import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  isMenuOpen = false;

  menuItems = [
    { label: 'Monuments', route: '/monuments' },
    { label: 'Guilds', route: '/guilds' },
    { label: 'About', route: '/about' },
    { label: 'Contact', route: '/contact' }
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
