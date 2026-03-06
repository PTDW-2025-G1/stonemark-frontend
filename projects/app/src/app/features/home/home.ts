import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '@features/home/sections/hero-section/hero-section';
import { LastMarkSectionComponent } from '@features/home/sections/last-marks-section/last-marks-section';
import { MapSectionComponent } from '@features/home/sections/map-section/map-section';
import { LastNewsComponent } from '@features/home/sections/last-news-section/last-news-section';
import {MarkOccurrenceService} from '@core/services/mark-occurrence/mark-occurrence.service';
import {MarkOccurrenceListDto} from '@api/model/mark-occurrence-list-dto';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroSectionComponent, LastMarkSectionComponent, MapSectionComponent, LastNewsComponent],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit{

    lastOccurrences: MarkOccurrenceListDto[] = [];

    constructor(private markOccurrenceService : MarkOccurrenceService) {}

    ngOnInit(): void {
        this.markOccurrenceService.getLatest().subscribe(occurrences => {
          this.lastOccurrences =  occurrences;
        });
    }

}
