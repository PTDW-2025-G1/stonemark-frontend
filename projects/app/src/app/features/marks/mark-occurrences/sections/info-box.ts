import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mark-occurrences-info-box',
  template: `
    <div class="mt-8 bg-gradient-to-br from-info/5 to-primary/5 rounded-2xl border border-info/20 p-6">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
          <i [class]="icon + ' text-info text-2xl'"></i>
        </div>
        <div>
          <h3 class="text-lg font-bold text-text mb-2">{{ title }}</h3>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class InfoBoxComponent {
  @Input() icon = 'bi bi-info-circle';
  @Input() title = 'About Mark Occurrences';
  @Input() description = 'Multiple occurrences of the same mason\'s mark across different monuments provide valuable historical evidence.\n' +
    'They help researchers trace the movement of craftsmen, understand medieval construction networks, and date architectural elements.\n' +
    'Each occurrence is carefully documented with precise location data and photographic evidence.';
}
