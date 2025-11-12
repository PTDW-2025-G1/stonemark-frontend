import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Monument } from '../../../../../../../projects/shared/src/lib/core/models/monument.model';

@Component({
  selector: 'app-monument-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monument-about.html'
})
export class MonumentAboutComponent {
  @Input({ required: true }) monument!: Monument;
}
