import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Monument } from '@core/models/monument.model';

@Component({
  selector: 'app-monument-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monument-details.html'
})
export class MonumentDetailsComponent {
  @Input({ required: true }) monument!: Monument;
}
