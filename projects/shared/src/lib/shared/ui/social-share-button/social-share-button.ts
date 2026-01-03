import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social-share-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="clicked.emit()"
      [title]="title"
      class="text-text-muted transition-all transform hover:scale-110 cursor-pointer"
      [ngClass]="[
        hoverClass,
        active ? activeClass : ''
      ]"
    >
      <i
        class="text-xl transition-all duration-200"
        [ngClass]="active ? activeIconClass : iconClass">
      </i>
    </button>
  `
})
export class SocialShareButtonComponent {
  @Input() iconClass!: string;
  @Input() activeIconClass?: string;

  @Input() title = '';
  @Input() hoverClass = '';

  @Input() active = false;
  @Input() activeClass = '';

  @Output() clicked = new EventEmitter<void>();
}
