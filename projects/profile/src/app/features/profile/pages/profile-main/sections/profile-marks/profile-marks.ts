import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkOccurrenceProposalListDto } from '@api/model/mark-occurrence-proposal-list-dto';
import { DateUtils } from '@shared/utils/date.utils';
import {ImageUtils} from '@shared/utils/image.utils';

@Component({
  selector: 'app-profile-marks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-marks.html'
})
export class ProfileMarksComponent {
  @Input() occurrences: MarkOccurrenceProposalListDto[] = [];
  @Output() addOccurrence = new EventEmitter<void>();
  @Output() viewOccurrence = new EventEmitter<number>();

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
