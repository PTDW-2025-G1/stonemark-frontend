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
    { label: 'APPRUPP', route: 'https://www.facebook.com/reabilitacaourbana/', external: true },
  ];

  exploreLinks = [
    { label: 'Monuments', route: `${this.baseUrl}/search/monuments`, external: false },
    { label: 'Marks', route: `${this.baseUrl}/search/marks`, external: false },
    { label: 'About', route: `${this.baseUrl}/about`, external: false }
  ];

  supportLinks = [
    { label: 'Help Center', route: `${this.baseUrl}/help`, external: false },
    { label: 'Contact', route: `${this.baseUrl}/contact`, external: false },
    { label: 'Terms of Service', route: `${this.baseUrl}/terms-service`, external: false },
    { label: 'Privacy Policy', route: `${this.baseUrl}/privacy-policy`, external: false },
    { label: 'Cookie Policy', route: `${this.baseUrl}/cookies-policy`, external: false }
  ];

  socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter-x' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' }
  ];
}
