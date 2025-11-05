import { Component, Input } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-mission-card',
  standalone: true,
  imports: [
    NgClass
  ],
  template: `
    <div
      class="rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
      [ngClass]="{ 'mt-8': offset }">
      <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
        <i [class]="icon + ' text-primary text-2xl'"></i>
      </div>
      <h3 class="text-lg font-semibold text-text mb-2">{{ title }}</h3>
      <p class="text-sm text-text-muted">{{ description }}</p>
    </div>
  `
})
export class MissionCardComponent {
  @Input() icon = '';
  @Input() title = '';
  @Input() description = '';
  @Input() offset = false;
}
