import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface AccessibilitySetting {
  id: string;
  category: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: string;
}

export interface SettingsCategory {
  name: string;
  settings: AccessibilitySetting[];
}

@Component({
  selector: 'app-accessibility-settings-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    @for (category of categorizedSettings; track category.name) {
      <div class="mb-12">
        <div class="flex items-center gap-4 mb-6">
          <div class="h-0.5 flex-1 bg-border"></div>
          <h2 class="text-2xl font-serif font-bold text-text px-4">
            {{ 'accessibility.categories.' + getCategoryKey(category.name) | translate }}
          </h2>
          <div class="h-0.5 flex-1 bg-border"></div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2">
          @for (setting of category.settings; track setting.id) {
            <div
              class="bg-surface-alt rounded-xl border-2 p-6 transition-all duration-300 ease-[var(--ease-soft)] hover:scale-[1.02]"
              [class.border-primary]="setting.enabled"
              [class.border-border]="!setting.enabled"
              [class.shadow-lg]="setting.enabled"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300"
                       [class.bg-primary]="setting.enabled"
                       [class.text-primary-foreground]="setting.enabled"
                       [class.bg-surface-muted]="!setting.enabled"
                       [class.text-text]="!setting.enabled">
                    <i [class]="setting.icon + ' text-xl'"></i>
                  </div>
                  <h3 class="font-sans font-semibold text-text text-lg">
                    {{ 'accessibility.settings.' + getSettingKey(setting.id) + '.title' | translate }}
                  </h3>
                </div>

                <button
                  (click)="onToggle(setting)"
                  [attr.aria-label]="'Toggle ' + setting.title"
                  [attr.aria-pressed]="setting.enabled"
                  class="relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ease-[var(--ease-soft)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex-shrink-0"
                  [class.bg-primary]="setting.enabled"
                  [class.bg-border]="!setting.enabled"
                >
                  <span
                    class="inline-block h-5 w-5 transform rounded-full bg-primary-foreground transition-transform duration-300 ease-[var(--ease-soft)]"
                    [class.translate-x-6]="setting.enabled"
                    [class.translate-x-1]="!setting.enabled"
                  ></span>
                </button>
              </div>

              <p class="text-sm text-text-muted leading-relaxed font-sans mb-3">
                {{ 'accessibility.settings.' + getSettingKey(setting.id) + '.desc' | translate }}
              </p>

              @if (setting.enabled) {
                <div class="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  <i class="bi bi-check-circle-fill"></i>
                  <span>{{ 'accessibility.status.active' | translate }}</span>
                </div>
              }
            </div>
          }
        </div>
      </div>
    }
  `
})
export class AccessibilitySettingsSectionComponent {
  @Input() categorizedSettings: SettingsCategory[] = [];
  @Output() toggle = new EventEmitter<AccessibilitySetting>();

  onToggle(setting: AccessibilitySetting): void {
    this.toggle.emit(setting);
  }

  getCategoryKey(category: string): string {
    return category.toLowerCase();
  }

  getSettingKey(id: string): string {
    return id.replace(/([A-Z])/g, '_$1').toLowerCase();
  }
}

