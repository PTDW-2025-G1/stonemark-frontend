import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer {
  currentYear = new Date().getFullYear();

  partnershipsLinks = [
    { label: 'UNESCO', route: 'https://www.unesco.org/en', external: true },
    { label: 'APPRUPP', route: 'https://aprupp.org/', external: true },
  ];

  exploreLinks = [
    { label: 'Monuments', route: '/monuments' },
    { label: 'Marks', route: '/marks' },
    { label: 'Features', route: '/about' }
  ];

  supportLinks = [
    { label: 'Help Center', route: '/help' },
    { label: 'Contact', route: '/contact' },
    { label: 'Terms of Service', route: '/terms' },
    { label: 'Privacy Policy', route: '/privacy' }
  ];

  socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter-x' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' }
  ];
}
