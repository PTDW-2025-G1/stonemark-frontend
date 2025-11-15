import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type TabType = 'all' | 'monuments' | 'marks';

@Component({
  selector: 'app-bookmarks-tabs-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="border-b border-border mb-8 sm:mb-12">
      <nav class="flex gap-6 sm:gap-8 overflow-x-auto scrollbar-hide">
        @for (tab of tabs; track tab.type) {
          <button
            (click)="tabChange.emit(tab.type)"
            class="px-4 py-3 sm:py-4 text-sm sm:text-base font-medium whitespace-nowrap border-b-2 transition-colors"
            [class.text-primary]="activeTab === tab.type"
            [class.border-primary]="activeTab === tab.type"
            [class.text-text-muted]="activeTab !== tab.type"
            [class.border-transparent]="activeTab !== tab.type"
            [class.hover:text-text]="activeTab !== tab.type">
            {{ tab.label }} ({{ tab.count }})
          </button>
        }
      </nav>
    </div>
  `
})
export class TabsSectionComponent {
  @Input() activeTab: TabType = 'all';
  @Input() tabs: { type: TabType, label: string, count: number }[] = [];
  @Output() tabChange = new EventEmitter<TabType>();
}
