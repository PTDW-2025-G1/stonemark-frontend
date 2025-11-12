import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-highlight-card',
  standalone: true,
  template: `
    <div class="bg-black/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-black/10 text-center hover:bg-black/10 transition-all duration-300">
      <div class="w-16 h-16 bg-black/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <i [class]="icon + ' text-3xl'"></i>
      </div>
      <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
      <p class="text-sm text-black/60">{{ description }}</p>
    </div>
  `
})
export class HighlightCardComponent {
  @Input() icon = '';
  @Input() title = '';
  @Input() description = '';
}
