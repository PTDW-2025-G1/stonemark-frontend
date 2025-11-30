import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {Observable, tap} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MonumentService } from '@core/services/monument/monument.service';
import {DomSanitizer, SafeResourceUrl, Title} from '@angular/platform-browser';
import { NotificationService } from '@core/services/notification.service';
import {MonumentResponseDto} from '@api/model/monument-response-dto';

@Component({
  selector: 'app-monument-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './monument-detail.html'
})
export class MonumentDetailComponent implements OnInit {
  monument$!: Observable<MonumentResponseDto | undefined>;
  mapUrl: SafeResourceUrl | null = null;
  isBookmarked = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monumentService: MonumentService,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.monument$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.monumentService.getMonumentById(id);
      }),
      tap(monument => {
        console.log('Monumento:', monument);
        if (monument && monument.latitude != null && monument.longitude != null) {
          this.setMapUrl(monument.latitude, monument.longitude);
          this.titleService.setTitle(`${monument.name} - StoneMark`);
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
    this.router.navigate(['/search/marks'], { queryParams: { monumentId } });
  }

  suggestCorrection(): void {
    console.log('Suggest Correction');
    const monumentId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/suggestions/new'], { queryParams: { monumentId } });
  }

  setMapUrl(latitude: number, longitude: number) {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openDirections(latitude: number, longitude: number) {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank');
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.notificationService.showSuccess('Link copied to clipboard!');
    });
  }

  shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }

  shareOnInstagram() {
    window.open('https://www.instagram.com/', '_blank');
  }
}
