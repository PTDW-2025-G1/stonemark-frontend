import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '@features/home/sections/hero-section/hero-section';
import { PopularSectionComponent } from '@features/home/sections/popular-section/popular-section';
import { LastMarkSectionComponent } from '@features/home/sections/last-marks-section/last-marks-section';
import { MapSectionComponent } from '@features/home/sections/map-section/map-section';
import { LastNewsComponent } from '@features/home/sections/last-news-section/last-news-section';
import {MonumentService} from '@core/services/monument/monument.service';
import {MonumentResponseDto} from '@api/model/monument-response-dto';
import {MarkOccurrenceService} from '@core/services/mark/mark-occurrence.service';
import {MarkOccurrenceDto} from '@api/model/mark-occurrence-dto';
import {MarkOccurrenceListDto} from '@api/model/mark-occurrence-list-dto';
import {MonumentListDto} from '@api/model/monument-list-dto';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroSectionComponent, PopularSectionComponent, LastMarkSectionComponent, MapSectionComponent, LastNewsComponent],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit{

    popularMonuments: MonumentListDto[] = [];
    lastOccurrences: MarkOccurrenceListDto[] = [];

    constructor(private monumentService: MonumentService, private markOccurrenceService : MarkOccurrenceService) {}

    ngOnInit(): void {
        this.monumentService.getLatestMonuments().subscribe(monuments => {
            this.popularMonuments = monuments;
        });
        this.markOccurrenceService.getLatestOccurrences().subscribe(occurrences => {
          this.lastOccurrences =  occurrences;
        });
    }

}
