import { Component } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-discover-gallery-loop-section',
  templateUrl: './discover-gallery-loop-section.html',
  imports: [TranslateModule]
})
export class DiscoverGalleryLoopSectionComponent {
  images = [
    '/assets/images/galleryMarkImage1.webp',
    '/assets/images/galleryMarkImage2.webp',
    '/assets/images/galleryMarkImage3.webp',
    '/assets/images/galleryMarkImage4.webp'
  ];
}
