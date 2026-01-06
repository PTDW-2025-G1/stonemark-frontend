import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '@env/environment';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
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
    { label: 'shared-links.monuments', route: `${this.baseUrl}/search/monuments`, external: false },
    { label: 'shared-links.marks', route: `${this.baseUrl}/search/marks`, external: false },
    { label: 'shared-links.discover', route: `${this.baseUrl}/discover`, external: false },
    { label: 'shared-links.about', route: `${this.baseUrl}/about`, external: false },
    { label: 'shared-links.accessibility', route: `${this.baseUrl}/accessibility`, external: false }
  ];

  supportLinks = [
    { label: 'shared-links.how_to_contribute', route: `${this.baseUrl}/contribute`, external: false },
    { label: 'shared-links.contact', route: `${this.baseUrl}/contact`, external: false },
    { label: 'shared-links.terms_service', route: `${this.baseUrl}/terms-service`, external: false },
    { label: 'shared-links.privacy_policy', route: `${this.baseUrl}/privacy-policy`, external: false },
    { label: 'shared-links.cookie_policy', route: `${this.baseUrl}/cookies-policy`, external: false }
  ];

  socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter-x' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' }
  ];
}
