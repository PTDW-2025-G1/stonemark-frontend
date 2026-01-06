import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '@shared/ui/button/button';

@Component({
  selector: 'app-accessibility-quick-reset-section',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonComponent],
  template: `
    <div class="bg-surface-alt rounded-2xl border-2 border-border p-6 mb-12 transition-all duration-300 hover:border-primary">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-sans font-semibold text-text mb-2">
            {{ 'accessibility.quick_reset.title' | translate }}
          </h2>
          <p class="text-sm text-text-muted">
            {{ 'accessibility.quick_reset.desc' | translate }}
          </p>
        </div>
        <app-button
          type="button"
          (click)="onReset()"
          variant="primary"
          size="md"
          [fullWidth]="false"
        >
          <i class="bi bi-arrow-clockwise text-lg"></i>
          <span>{{ 'accessibility.quick_reset.button' | translate }}</span>
        </app-button>
      </div>
    </div>
  `
})
export class AccessibilityQuickResetSectionComponent {
  @Output() reset = new EventEmitter<void>();

  onReset(): void {
    this.reset.emit();
  }
}

