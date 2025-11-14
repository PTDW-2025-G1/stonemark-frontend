import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mark } from '@core/models/mark.model';

@Component({
  selector: 'app-profile-marks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-marks.html'
})
export class ProfileMarksComponent {
  @Input() marks: Mark[] = [];
  @Output() addMark = new EventEmitter<void>();
  @Output() editMark = new EventEmitter<Mark>();
  @Output() removeMark = new EventEmitter<Mark>();
  @Output() viewMark = new EventEmitter<Mark>();
}
