import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';
import { MarkOccurrenceDto } from '@api/model/mark-occurrence-dto';
import { DateUtils } from '@shared/utils/date.utils';

@Component({
  selector: 'app-mark-occurrence-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mark-occurrence-detail.html'
})
export class MarkOccurrenceDetail implements OnInit {
  occurrence: MarkOccurrenceDto = {} as MarkOccurrenceDto;
  loading = true;

  // Placeholder image URL (replace with actual photo service)
  readonly placeholderImage = 'https://photos1.blogger.com/blogger/6821/1071/1600/marca_alco6.jpg';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private markOccurrenceService: MarkOccurrenceService
  ) {}

  ngOnInit(): void {
    const occurrenceId = this.route.snapshot.paramMap.get('id');
    if (occurrenceId) {
      this.loadOccurrenceDetail(Number(occurrenceId));
    }
  }

  loadOccurrenceDetail(id: number): void {
    this.markOccurrenceService.getById(id).subscribe({
      next: (occurrence) => {
        if (occurrence) {
          this.occurrence = occurrence;
          this.titleService.setTitle(`${occurrence.mark?.title} at ${occurrence.monument?.name} - StoneMark`);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading occurrence:', err);
        this.loading = false;
        this.router.navigate(['/marks']);
      }
    });
  }

  viewMonument(): void {
    if (this.occurrence?.monument?.id) {
      this.router.navigate(['/monuments', this.occurrence.monument.id]);
    }
  }

  viewMark(): void {
    if (this.occurrence?.mark?.id) {
      this.router.navigate(['/marks', this.occurrence.mark.id]);
    }
  }

  getFormattedDate(date: string | Date | undefined): string {
    return DateUtils.formatDate(date);
  }

  getUserInitials(): string {
    const userName = this.occurrence?.createdBy;
    if (!userName || typeof userName !== 'string') return 'U';

    const nameParts = userName.trim().split(' ');
    if (nameParts.length === 0) return 'U';

    const firstInitial = nameParts[0]?.[0] || '';
    const lastInitial = nameParts[nameParts.length - 1]?.[0] || '';

    return `${firstInitial}${lastInitial}`.toUpperCase();
  }

  copyLocation(): void {
    const monument = this.occurrence?.monument;
    if (monument?.latitude && monument?.longitude) {
      const coords = `${monument.latitude}, ${monument.longitude}`;
      navigator.clipboard.writeText(coords);
    }
  }

  shareFacebook(): void {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  }

  shareTwitter(): void {
    const url = window.location.href;
    const text = `Check out this stone mason mark occurrence!`;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
  }

  copyShareLink(): void {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  }

  openInMaps(): void {
    const monument = this.occurrence?.monument;
    if (monument?.latitude && monument?.longitude) {
      window.open(`https://www.google.com/maps?q=${monument.latitude},${monument.longitude}`, '_blank');
    }
  }
}
