import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  template: `
    <div class="group bg-surface rounded-2xl p-6 sm:p-8 border border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div class="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <i [class]="icon + ' text-white text-2xl'"></i>
      </div>
      <h3 class="text-xl font-serif font-semibold text-text mb-3">{{ title }}</h3>
      <p class="text-text-muted leading-relaxed">
        {{ description }}
      </p>
    </div>
  `
})
export class FeatureCardComponent {
  @Input() icon = '';
  @Input() title = '';
  @Input() description = '';
}
