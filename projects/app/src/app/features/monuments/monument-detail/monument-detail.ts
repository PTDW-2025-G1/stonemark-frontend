import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { MonumentService } from '@core/services/monument.service';
import { Monument } from '@core/models/monument.model';
import { Observable, switchMap } from 'rxjs';
import {MonumentHeroComponent} from '@features/monuments/monument-detail/sections/hero/monument-hero';
import {MonumentAboutComponent} from '@features/monuments/monument-detail/sections/about/monument-about';
import {MonumentDetailsComponent} from '@features/monuments/monument-detail/sections/details/monument-details';
import {MonumentLocationComponent} from '@features/monuments/monument-detail/sections/location/monument-location';
import {MonumentExploreComponent} from '@features/monuments/monument-detail/sections/explore/monument-explore';

@Component({
  selector: 'app-monument-detail',
  standalone: true,
  imports: [CommonModule, MonumentHeroComponent, MonumentAboutComponent, MonumentDetailsComponent, MonumentLocationComponent, MonumentExploreComponent],
  templateUrl: './monument-detail.html'
})
export class MonumentDetailComponent implements OnInit {
  monument$!: Observable<Monument | undefined>;

  constructor(
    private route: ActivatedRoute,
    private monumentService: MonumentService,
  ) {}

  ngOnInit(): void {
    this.monument$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.monumentService.getMonumentById(id);
      })
    );
  }

  scrollToContent() {
    const el = document.getElementById('main-content');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
