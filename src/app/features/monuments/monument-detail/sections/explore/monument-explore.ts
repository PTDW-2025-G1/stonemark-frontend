import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Monument } from '@core/models/monument.model';

@Component({
  selector: 'app-monument-explore',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monument-explore.html'
})
export class MonumentExploreComponent {
  @Input({ required: true }) monument!: Monument;

  // Estes valores podem vir da API no futuro
  stats = {
    marks: 12,
    guilds: 5,
    contributions: 28
  };

  onSeeMarks() {
    console.log('→ Viewing marks for:', this.monument.name);
  }

  onCaptureMark() {
    console.log('→ Capturing new mark for:', this.monument.name);
  }

  onReportIssue() {
    console.log('→ Reporting issue for:', this.monument.name);
  }
}
