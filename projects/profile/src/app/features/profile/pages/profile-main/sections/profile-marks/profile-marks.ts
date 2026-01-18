import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkOccurrenceProposalListDto } from '@api/model/mark-occurrence-proposal-list-dto';
import { DateUtils } from '@shared/utils/date.utils';
import {ImageUtils} from '@shared/utils/image.utils';
import { PaginationComponent } from '@shared/ui/pagination/pagination';

@Component({
  selector: 'app-profile-marks',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './profile-marks.html'
})
export class ProfileMarksComponent {
  @Input() occurrences: MarkOccurrenceProposalListDto[] = [];
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() viewOccurrence = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();

  getImageUrl(occurrence: MarkOccurrenceProposalListDto): string {
    return ImageUtils.getImageUrl(
      occurrence.coverId,
      'assets/placeholder.png'
    );
  }

  formatDate(date: string | undefined): string {
    return DateUtils.formatShortDate(date);
  }

  statusLabel(status?: string): string {
    if (!status) return 'Unknown';
    return status
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
