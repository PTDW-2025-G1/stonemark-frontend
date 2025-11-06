import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Monument } from '@core/models/monument.model';
import {ActionButtonComponent} from '@shared/ui/action-button/action-button';

@Component({
  selector: 'app-monument-explore',
  standalone: true,
  imports: [CommonModule, ActionButtonComponent],
  templateUrl: './monument-explore.html'
})
export class MonumentExploreComponent {
  @Input({ required: true }) monument!: Monument;

  stats = {
    marks: 12,
    contributions: 28
  };

  onSeeMarks() {
    console.log('→ Viewing marks for:', this.monument.name);
  }

  onCaptureMark() {
    console.log('→ Capturing new mark for:', this.monument.name);
  }

  onSubmitCorrection() {
    console.log('→ Reporting issue for:', this.monument.name);
  }
}
