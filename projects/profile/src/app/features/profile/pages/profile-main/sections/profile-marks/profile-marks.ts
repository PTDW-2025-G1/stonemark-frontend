import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MarkOccurrenceDto} from '@api/model/mark-occurrence-dto';
import {ImageUtils} from '@shared/utils/image.utils';

@Component({
  selector: 'app-profile-marks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-marks.html'
})
export class ProfileMarksComponent {
  @Input() occurrences: MarkOccurrenceDto[] = [];
  @Output() addOccurrence = new EventEmitter<MarkOccurrenceDto>();
  @Output() editOccurrence = new EventEmitter<MarkOccurrenceDto>();
  @Output() removeOccurrence = new EventEmitter<MarkOccurrenceDto>();
  @Output() viewOccurrence = new EventEmitter<MarkOccurrenceDto>();

  getImageUrl(occurrence: MarkOccurrenceDto): string {
    return ImageUtils.getImageUrl(
      occurrence.coverId,
      'assets/placeholder.png'
    );
  }
}
