import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-suggest-title',
  standalone: true,
  template: `
    <div class="mb-6">
      <h1 class="text-3xl font-serif font-bold text-text">
        {{ name || 'Suggest Correction' }}
      </h1>
      <p class="text-sm text-text-muted mt-2">
        Submit a Correction - Help us to improve the information by suggestion changes and reporting possible errors
      </p>
    </div>
  `
})
export class SuggestTitleComponent {
  @Input() name: string = '';
}
