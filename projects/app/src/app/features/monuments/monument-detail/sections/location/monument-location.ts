import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Monument } from '@core/models/monument.model';

@Component({
  selector: 'app-monument-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monument-location.html'
})
export class MonumentLocationComponent implements OnChanges {
  @Input({ required: true }) monument!: Monument;
  mapUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monument'] && this.monument?.lat && this.monument?.lon) {
      this.setMapUrl(this.monument.lat, this.monument.lon);
    }
  }

  setMapUrl(lat: number, lon: number) {
    const url = `https://www.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openDirections(lat: number, lon: number) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, '_blank');
  }
}
