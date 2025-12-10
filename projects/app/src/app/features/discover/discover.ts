import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
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
    "https://www.portugalresident.com/wp-content/uploads/2025/10/Silves-stone-marks-1416.jpg",
    "https://per-storemyr.net/wp-content/uploads/2015/05/harrell-storemyr_fig-10_op.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/d/da/Steinhoggermerke_211_Nidaros.jpg",
    "https://photos1.blogger.com/blogger/6821/1071/1600/marca_alco6.jpg"
  ];
}
