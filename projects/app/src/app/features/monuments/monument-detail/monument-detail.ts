import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MonumentService } from '@core/services/monument/monument.service';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { MonumentResponseDto } from '@api/model/monument-response-dto';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';
import { BookmarkDto } from '@api/model/bookmark-dto';
import { BookmarkFacade } from '@shared/facades/bookmark.facade';
import { ReportModalComponent } from '@shared/ui/report-modal/report-modal';
import { ReportFacade } from '@shared/facades/report.facade';
import { ImageUtils } from '@shared/utils/image.utils';
import { MONUMENTS_ICON } from '@core/constants/content-icons';
import { SafeHtmlPipe } from '@shared/pipes/safe-html.pipe';
import {ButtonComponent} from '@shared/ui/button/button';
import {ShareFacade} from '@shared/facades/share.facade';
import {ShareSectionComponent} from '@shared/ui/share-section/share-section';

@Component({
  selector: 'app-monument-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReportModalComponent, SafeHtmlPipe, ButtonComponent, ShareSectionComponent],
  templateUrl: './monument-detail.html'
})
export class MonumentDetailComponent implements OnInit {
  monument$!: Observable<MonumentResponseDto | undefined>;
  mapUrl: SafeResourceUrl | null = null;
  occurrencesCount = 0;

  private currentMonumentId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monumentService: MonumentService,
    private markOccurrenceService: MarkOccurrenceService,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    public bookmarkFacade: BookmarkFacade,
    public reportFacade: ReportFacade,
    public shareFacade: ShareFacade
  ) { }

  monumentsIcon = MONUMENTS_ICON;

  ngOnInit(): void {
    this.monument$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        this.currentMonumentId = id;

        this.bookmarkFacade.init(BookmarkDto.TypeEnum.Monument, id);

        this.markOccurrenceService.countByMonumentId(id).subscribe(count => {
          this.occurrencesCount = count;
        });

        return this.monumentService.getMonumentById(id);
      }),
      tap(monument => {
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
    if (!this.currentMonumentId) return;
    this.bookmarkFacade.toggle(
      BookmarkDto.TypeEnum.Monument,
      this.currentMonumentId
    );
  }

  captureMark(): void {
    this.router.navigate(['/submit'])
  }

  viewMarks(): void {
    const monumentId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/search/marks'], { queryParams: { monumentId } });
  }

  viewOccurrences(): void {
    if (this.currentMonumentId != null) {
      this.router.navigate(['/monuments', this.currentMonumentId, 'marks']);
    }
  }

  suggestCorrection(): void {
    const monumentId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/suggestions/new'], { queryParams: { monumentId } });
  }

  setMapUrl(latitude: number, longitude: number) {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openReportModal(): void {
    if (!this.currentMonumentId) return;

    this.monumentService.getMonumentById(this.currentMonumentId).subscribe(monument => {
      if (!monument) return;

      this.reportFacade.open({
        targetId: monument.id!,
        targetType: 'MONUMENT',
        targetName: monument.name
      });
    });
  }

  getImageUrl(monument: MonumentResponseDto): string {
    return ImageUtils.getImageUrl(monument.coverId, 'assets/placeholder.png');
  }
}
