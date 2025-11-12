import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '@features/home/sections/hero-section';
import { PopularSectionComponent } from '@features/home/sections/popular-section';
import { LastMarkSectionComponent } from '@features/home/sections/last-marks-section';
import { MapSectionComponent } from '@features/home/sections/map-section';
import { LastNewsComponent } from '@features/home/sections/last-news-section';
import {MonumentService} from '../../../../projects/shared/src/lib/core/services/monument.service';
import {MarkService} from '../../../../projects/shared/src/lib/core/services/mark.service';
import {Monument} from '../../../../projects/shared/src/lib/core/models/monument.model';
import {Mark} from '../../../../projects/shared/src/lib/core/models/mark.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroSectionComponent, PopularSectionComponent, LastMarkSectionComponent, MapSectionComponent, LastNewsComponent],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit{

    popularMonuments: Monument[] = [];
    lastMarks: Mark[] = [];

    constructor(private monumentService: MonumentService, private markService : MarkService) {}

    ngOnInit(): void {
        this.monumentService.getPopularMonuments().subscribe(monuments => {
            this.popularMonuments = monuments;
        });
        this.markService.getLastMarks().subscribe(marks => {
            this.lastMarks = marks;
        });
    }

}
