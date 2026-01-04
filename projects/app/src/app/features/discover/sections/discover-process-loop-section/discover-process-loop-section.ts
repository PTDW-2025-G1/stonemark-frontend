import { Component } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-discover-process-loop-section',
  templateUrl: './discover-process-loop-section.html',
  imports: [TranslateModule]
})
export class DiscoverProcessLoopSectionComponent {
  processSteps = [
    { number: '01', key: '1', icon: 'search' },
    { number: '02', key: '2', icon: 'camera' },
    { number: '03', key: '3', icon: 'scan' },
    { number: '04', key: '4', icon: 'database' }
  ];
}
