import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Monument } from '../../../../../../../projects/shared/src/lib/core/models/monument.model';

@Component({
  selector: 'app-monument-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './monument-hero.html'
})
export class MonumentHeroComponent {
  @Input({ required: true }) monument!: Monument;
  @Output() scrollToContent = new EventEmitter<void>();

  onScrollToContent(): void {
    this.scrollToContent.emit();
  }
}
