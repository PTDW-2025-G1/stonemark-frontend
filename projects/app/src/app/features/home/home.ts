import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '@features/home/sections/hero-section/hero-section';
import { PopularSectionComponent } from '@features/home/sections/popular-section/popular-section';
import { LastMarkSectionComponent } from '@features/home/sections/last-marks-section/last-marks-section';
import { MapSectionComponent } from '@features/home/sections/map-section/map-section';
import { LastNewsComponent } from '@features/home/sections/last-news-section/last-news-section';
import {MonumentService} from '@core/services/monument/monument.service';
import {MarkService} from '@core/services/mark/mark.service';
import {Mark} from '@core/models/mark.model';
import {MonumentResponseDto} from '@api/model/monument-response-dto';
import {MarkDto} from '@api/model/mark-dto';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroSectionComponent, PopularSectionComponent, LastMarkSectionComponent, MapSectionComponent, LastNewsComponent],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit{

    popularMonuments: MonumentResponseDto[] = [];
    lastMarks: MarkDto[] = [];

    constructor(private monumentService: MonumentService, private markService : MarkService) {}

    ngOnInit(): void {
        this.monumentService.getLatestMonuments().subscribe(monuments => {
            this.popularMonuments = monuments;
        });
        this.markService.getPageMarks().subscribe(page => {
          this.lastMarks = page.content ?? [];
        });
    }

}
