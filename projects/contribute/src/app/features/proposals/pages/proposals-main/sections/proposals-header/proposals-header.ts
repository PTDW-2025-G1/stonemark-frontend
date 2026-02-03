import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MARKS_ICON } from '@core/constants/content-icons';
import { SafeHtmlPipe } from '@shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-proposals-header',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  templateUrl: './proposals-header.html'
})
export class ProposalsHeaderComponent {
  @Input() stats: any;

  marksIcon = MARKS_ICON;
}
