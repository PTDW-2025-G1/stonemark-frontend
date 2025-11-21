import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-stat-card',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="card mb-0 h-full">
            <div class="flex justify-between mb-4">
                <div>
                    <span class="block text-muted-color font-medium mb-4">{{ title }}</span>
                    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ value }}</div>
                </div>
                <div
                    class="flex items-center justify-center rounded-border"
                    [ngClass]="bgColor"
                    style="width: 2.5rem; height: 2.5rem"
                >
                    <i class="pi text-xl!" [ngClass]="[icon, iconColor]"></i>
                </div>
            </div>
            <span class="text-primary font-medium">{{ highlight }}</span>
            <span class="text-muted-color">{{ subtitle }}</span>
        </div>
    `
})
export class StatCardComponent {
    @Input() title = '';
    @Input() value = '';
    @Input() icon = '';
    @Input() iconColor = '';
    @Input() bgColor = '';
    @Input() highlight = '';
    @Input() subtitle = '';
}
