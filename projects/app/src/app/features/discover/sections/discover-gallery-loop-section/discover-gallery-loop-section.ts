import { Component } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-discover-gallery-loop-section',
  templateUrl: './discover-gallery-loop-section.html',
  imports: [TranslateModule]
})
export class DiscoverGalleryLoopSectionComponent {
  images = [
    '/assets/images/galleryMarkImage1.jpg',
    '/assets/images/galleryMarkImage2.jpg',
    '/assets/images/galleryMarkImage3.jpg',
    '/assets/images/galleryMarkImage4.jpg'
  ];
}
