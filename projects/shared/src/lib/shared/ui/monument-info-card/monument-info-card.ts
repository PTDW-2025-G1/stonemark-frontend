import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monument-info-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="group relative overflow-hidden bg-gradient-to-br from-surface-alt to-surface rounded-2xl p-6 sm:p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
    >
      <div
        class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"
      ></div>
      <div class="relative">
        <div
          class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
        >
          <i [ngClass]="icon" class="text-primary text-2xl"></i>
        </div>
        <p class="text-sm text-text-muted uppercase tracking-wider font-semibold mb-2">
          {{ label }}
        </p>
        <p class="text-xl sm:text-2xl font-semibold text-text" [ngClass]="valueClass">
          {{ value }}
        </p>
      </div>
    </div>
  `
})
export class MonumentInfoCardComponent {
  @Input() icon!: string;
  @Input() label!: string;
  @Input() value!: string;
  @Input() valueClass = '';
}
