import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Monument } from '../../../../../../../projects/shared/src/lib/core/models/monument.model';
import {MonumentInfoCardComponent} from '../../../../../../../projects/shared/src/lib/shared/ui/monument-info-card/monument-info-card';

@Component({
  selector: 'app-monument-details',
  standalone: true,
  imports: [CommonModule, MonumentInfoCardComponent],
  templateUrl: './monument-details.html'
})
export class MonumentDetailsComponent {
  @Input({ required: true }) monument!: Monument;
}
