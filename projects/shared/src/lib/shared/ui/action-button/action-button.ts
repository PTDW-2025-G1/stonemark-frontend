import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [ngClass]="buttonClass"
      (click)="onClick()"
      type="button"
    >
      @if (gradientClass) {
        <div [ngClass]="gradientClass"></div>
      }
      <div class="relative flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div [ngClass]="iconBgClass">
            <i [ngClass]="iconClass"></i>
          </div>
          <div class="text-left">
            <p class="font-semibold text-lg">{{ title }}</p>
            <p class="text-sm" [ngClass]="subtitleClass">{{ subtitle }}</p>
          </div>
        </div>
        <i class="bi bi-arrow-right text-xl group-hover:translate-x-2 transition-transform"></i>
      </div>
    </button>
  `
})
export class ActionButtonComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() iconClass!: string;
  @Input() buttonClass!: string;
  @Input() iconBgClass!: string;
  @Input() subtitleClass: string = '';
  @Input() gradientClass?: string;
  @Input() onClick: () => void = () => {};
}
