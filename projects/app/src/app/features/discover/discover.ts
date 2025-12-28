import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from '@shared/ui/button/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink],
  templateUrl: './discover.html',
})
export class DiscoverPageComponent {
  processSteps = [
    {
      number: '01',
      title: 'Find a Mark',
      desc: 'Locate a mason\'s mark on a historical monument, cathedral wall, or ancient bridge structure.',
      icon: 'search'
    },
    {
      number: '02',
      title: 'Capture',
      desc: 'Take a high-contrast photo using the StoneMark app. Good lighting helps reveal faint carvings.',
      icon: 'camera'
    },
    {
      number: '03',
      title: 'AI Analysis',
      desc: 'Our embeddings model analyzes the geometry, grouping similar marks across different locations.',
      icon: 'scan'
    },
    {
      number: '04',
      title: 'Heritage',
      desc: 'The mark is indexed into the global public database, accessible to researchers worldwide.',
      icon: 'database'
    }
  ];

  galleryImages = [
    "/assets/images/galleryMarkImage1.jpg",
    "/assets/images/galleryMarkImage2.jpg",
    "/assets/images/galleryMarkImage3.jpg",
    "/assets/images/galleryMarkImage4.jpg"
  ];
}
