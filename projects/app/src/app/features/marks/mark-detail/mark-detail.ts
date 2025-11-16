import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MarkService } from '@core/services/mark.service';
import { MarkCategory } from '@core/enums/mark.category';
import { MarkShape } from '@core/enums/mark.shape';
import {Mark} from '@core/models/mark.model';

@Component({
  selector: 'app-mark-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mark-detail.html'
})
export class MarkDetailComponent implements OnInit {
  mark: Mark | null = null;
  loading = true;
  isBookmarked = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private markService: MarkService
  ) {}

  ngOnInit(): void {
    const markId = this.route.snapshot.paramMap.get('id');
    if (markId) {
      this.loadMarkDetail(Number(markId));
    }
  }

  loadMarkDetail(id: number): void {
    this.markService.getMarkById(id).subscribe({
      next: (mark) => {
        if (mark) {
          this.mark = mark;
        } else {
          // Mark não encontrado, redirecionar
          console.error('Mark not found');
          this.router.navigate(['/profile']);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading mark:', err);
        this.loading = false;
        this.router.navigate(['/profile']);
      }
    });
  }

  getCategoryLabel(category: MarkCategory): string {
    const labels = {
      [MarkCategory.RELIGIOUS]: 'Religious',
      [MarkCategory.MASONIC]: 'Masonic',
      [MarkCategory.TRADE]: 'Trade Mark',
      [MarkCategory.HERALDIC]: 'Heraldic',
      [MarkCategory.GEOMETRIC]: 'Geometric',
      [MarkCategory.UNKNOWN]: 'Unknown'
    };
    return labels[category] || category;
  }

  getCategoryIcon(category: MarkCategory): string {
    const icons = {
      [MarkCategory.RELIGIOUS]: 'bi-cross',
      [MarkCategory.MASONIC]: 'bi-compass',
      [MarkCategory.TRADE]: 'bi-hammer',
      [MarkCategory.HERALDIC]: 'bi-shield',
      [MarkCategory.GEOMETRIC]: 'bi-pentagon',
      [MarkCategory.UNKNOWN]: 'bi-question-circle'
    };
    return icons[category] || 'bi-circle';
  }

  getShapeLabel(shape: MarkShape): string {
    const labels = {
      [MarkShape.CIRCLE]: 'Circle',
      [MarkShape.CROSS]: 'Cross',
      [MarkShape.STAR]: 'Star',
      [MarkShape.TRIANGLE]: 'Triangle',
      [MarkShape.LETTER]: 'Letter',
      [MarkShape.SYMBOL]: 'Symbol',
      [MarkShape.OTHER]: 'Other'
    };
    return labels[shape] || shape;
  }

  getShapeIcon(shape: MarkShape): string {
    const icons = {
      [MarkShape.CIRCLE]: 'bi-circle',
      [MarkShape.CROSS]: 'bi-x-lg',
      [MarkShape.STAR]: 'bi-star',
      [MarkShape.TRIANGLE]: 'bi-triangle',
      [MarkShape.LETTER]: 'bi-alphabet',
      [MarkShape.SYMBOL]: 'bi-symbols',
      [MarkShape.OTHER]: 'bi-dash-circle'
    };
    return icons[shape] || 'bi-square';
  }

  toggleBookmark(): void {
    this.isBookmarked = !this.isBookmarked;
    if (this.mark) {
      this.mark.bookmarks += this.isBookmarked ? 1 : -1;
    }
  }

  viewMonument(): void {
    if (this.mark && this.mark.monumentId) {
      this.router.navigate(['/monuments', this.mark.monumentId]);
    }
  }
}
