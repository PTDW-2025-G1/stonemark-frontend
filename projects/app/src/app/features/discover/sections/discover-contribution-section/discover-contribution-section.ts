import { Component } from '@angular/core';
import { ButtonComponent } from '@shared/ui/button/button';
import { RouterLink } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-discover-contribution-section',
  templateUrl: './discover-contribution-section.html',
  imports: [ButtonComponent, RouterLink, TranslateModule]
})
export class DiscoverContributionSectionComponent {}
