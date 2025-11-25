import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '@features/home/sections/hero-section';
import { PopularSectionComponent } from '@features/home/sections/popular-section';
import { LastMarkSectionComponent } from '@features/home/sections/last-marks-section';
import { MapSectionComponent } from '@features/home/sections/map-section';
import { LastNewsComponent } from '@features/home/sections/last-news-section';
import {MonumentService} from '@core/services/monument.service';
import {MarkService} from '@core/services/mark.service';
import {Mark} from '@core/models/mark.model';
import {MonumentResponseDto} from '@api/model/monument-response-dto';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroSectionComponent, PopularSectionComponent, LastMarkSectionComponent, MapSectionComponent, LastNewsComponent],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit{

    popularMonuments: MonumentResponseDto[] = [];
    lastMarks: Mark[] = [];

    constructor(private monumentService: MonumentService, private markService : MarkService) {}

    ngOnInit(): void {
        this.monumentService.getLatestMonuments().subscribe(monuments => {
            this.popularMonuments = monuments;
        });
        this.markService.getLastMarks().subscribe(marks => {
            this.lastMarks = marks;
        });
    }

}
