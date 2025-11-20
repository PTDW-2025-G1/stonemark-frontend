import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type Section = 'information' | 'history' | 'map';

@Component({
  selector: 'app-suggest-step1',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3 class="text-lg font-semibold text-text mb-1">
      Step 1: Select Sections to Correct
    </h3>

    <p class="text-sm text-text-muted mb-6">
      Choose which sections need correction.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

      <!-- Information -->
      <button
        type="button"
        (click)="toggle('information')"
        [attr.aria-pressed]="isSelected('information')"
        class="w-full rounded-xl p-6 flex flex-col items-center justify-center transition-all focus:outline-none"
        [ngStyle]="{
          'border': '1.5px solid',
          'border-color': isSelected('information') ? 'var(--color-success)' : 'var(--color-border)'
        }"
        [class.shadow-md]="isSelected('information')"
        [class.-translate-y-0.5]="isSelected('information')"
      >
        <div class="w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-violet-50">
          <i class="bi bi-info-circle-fill text-2xl text-text"></i>
        </div>
        <div class="text-sm font-medium text-text">Information</div>
      </button>

      <!-- History -->
      <button
        type="button"
        (click)="toggle('history')"
        [attr.aria-pressed]="isSelected('history')"
        class="w-full rounded-xl p-6 flex flex-col items-center justify-center transition-all focus:outline-none"
        [ngStyle]="{
          'border': '1.5px solid',
          'border-color': isSelected('history') ? 'var(--color-success)' : 'var(--color-border)'
        }"
        [class.shadow-md]="isSelected('history')"
        [class.-translate-y-0.5]="isSelected('history')"
      >
        <div class="w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-violet-50">
          <i class="bi bi-clock-history text-2xl text-text"></i>
        </div>
        <div class="text-sm font-medium text-text">History</div>
      </button>

      <!-- Map -->
      <button
        type="button"
        (click)="toggle('map')"
        [attr.aria-pressed]="isSelected('map')"
        class="w-full rounded-xl p-6 flex flex-col items-center justify-center transition-all focus:outline-none"
        [ngStyle]="{
          'border': '1.5px solid',
          'border-color': isSelected('map') ? 'var(--color-success)' : 'var(--color-border)'
        }"
        [class.shadow-md]="isSelected('map')"
        [class.-translate-y-0.5]="isSelected('map')"
      >
        <div class="w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-violet-50">
          <i class="bi bi-geo-alt-fill text-2xl text-text"></i>
        </div>
        <div class="text-sm font-medium text-text">Map</div>
      </button>
    </div>

    <div class="mt-6 flex justify-between">
      <button
        type="button"
        class="px-4 py-2 rounded-full border border-border text-text-muted"
        (click)="cancel.emit()"
      >
        Cancel
      </button>

      <button
        class="px-4 py-2 rounded-full bg-text text-primary-foreground
        disabled:opacity-40 disabled:cursor-not-allowed"
        (click)="next.emit()"
        [disabled]="sections.length === 0"
      >
        Next
      </button>
    </div>
  `
})
export class SuggestStep1Component {

  @Input() sections: Section[] = [];
  @Output() sectionsChange = new EventEmitter<Section[]>();

  @Output() next = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  toggle(section: Section) {
    const idx = this.sections.indexOf(section);
    const updated = [...this.sections];

    if (idx === -1) updated.push(section);
    else updated.splice(idx, 1);

    this.sections = updated;
    this.sectionsChange.emit(updated);
  }

  isSelected(section: Section) {
    return this.sections.includes(section);
  }
}
