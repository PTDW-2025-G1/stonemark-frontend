import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-suggest-progress-bar',
  standalone: true,
  template: `
    <div class="mb-6">
      <div class="flex items-center text-sm font-medium text-text-muted mb-2">
        <div class="flex-1 text-left">Select Sections</div>
        <div class="flex-1 text-center">Edit Information</div>
        <div class="flex-1 text-right">Review &amp; Comment</div>
      </div>
      <div class="h-3 rounded-full bg-border overflow-hidden">
        <div
          class="h-full rounded-full transition-all"
          [style.width.%]="progress"
          style="background: var(--color-text);"
        ></div>
      </div>
    </div>
  `
})
export class SuggestProgressBarComponent {
  @Input() progress: number = 0;
}
