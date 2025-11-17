import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mark-occurrences-empty-state',
  template: `
    <div class="text-center py-16 bg-surface-alt rounded-2xl border-2 border-dashed border-border">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
        <i class="bi bi-collection text-primary text-4xl"></i>
      </div>
      <h3 class="text-xl font-bold text-text mb-2">{{ title }}</h3>
      <p class="text-text-muted mb-6">{{ description }}</p>
    </div>
  `,
  styles: []
})
export class EmptyStateComponent {
  @Input() title = 'No occurrences found';
  @Input() description = "This mark hasn't been documented at other locations yet.";
}
