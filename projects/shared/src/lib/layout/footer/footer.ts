import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '@env/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer {
  currentYear = new Date().getFullYear();
  baseUrl = environment.baseUrl;

  partnershipsLinks = [
    { label: 'UNESCO', route: 'https://www.unesco.org/en', external: true },
    { label: 'APPRUPP', route: 'https://aprupp.org/', external: true },
  ];

  exploreLinks = [
    { label: 'Monuments', route: `${this.baseUrl}/monuments`, external: false },
    { label: 'Marks', route: `${this.baseUrl}/marks`, external: false },
    { label: 'Features', route: `${this.baseUrl}/about`, external: false }
  ];

  supportLinks = [
    { label: 'Help Center', route: `${this.baseUrl}/help`, external: false },
    { label: 'Contact', route: `${this.baseUrl}/contact`, external: false },
    { label: 'Terms of Service', route: `${this.baseUrl}/terms`, external: false },
    { label: 'Privacy Policy', route: `${this.baseUrl}/privacy`, external: false }
  ];

  socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter-x' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' }
  ];
}
