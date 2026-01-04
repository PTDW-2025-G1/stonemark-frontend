import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '@shared/ui/button/button';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-discover-hero-section',
  templateUrl: './discover-hero-section.html',
  imports: [RouterLink, ButtonComponent, TranslateModule]
})
export class DiscoverHeroSectionComponent {}
