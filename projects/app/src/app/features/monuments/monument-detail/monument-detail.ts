import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {Observable, tap} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MonumentService } from '@core/services/monument.service';
import { Monument } from '@core/models/monument.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-monument-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './monument-detail.html'
})
export class MonumentDetailComponent implements OnInit {
  monument$!: Observable<Monument | undefined>;
  mapUrl: SafeResourceUrl | null = null;
  isBookmarked = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monumentService: MonumentService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.monument$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.monumentService.getMonumentById(id);
      }),
      tap(monument => {
        if (monument && monument.lat != null && monument.lon != null) {
          this.setMapUrl(monument.lat, monument.lon);
        } else {
          this.mapUrl = null;
        }
      })
    );
  }

  toggleBookmark(): void {
    this.isBookmarked = !this.isBookmarked;
  }

  captureMark(): void {
    this.router.navigate(['/marks/capture']);
  }

  viewMarks(): void {
    console.log('View Marks');
    const monumentId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/marks'], { queryParams: { monumentId } });
  }

  suggestCorrection(): void {
    console.log('Suggest Correction');
    const monumentId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/suggestions/new'], { queryParams: { monumentId } });
  }

  setMapUrl(lat: number, lon: number) {
    const url = `https://www.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openDirections(lat: number, lon: number) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, '_blank');
  }

}
