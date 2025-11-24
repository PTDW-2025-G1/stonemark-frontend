import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { PrimeTemplate } from 'primeng/api';

export type ContactStatusFilterValue = 'ALL' | 'PENDING' | 'READ';

@Component({
    selector: 'app-status-filter-contact',
    standalone: true,
    imports: [CommonModule, FormsModule, Select, Tag, PrimeTemplate],
    template: `
        <div class="status-filter">
            <p-select
                [(ngModel)]="selected"
                [options]="options"
                optionLabel="label"
                optionValue="value"
                placeholder="Filter by status"
                (onChange)="emitChange()"
                class="status-select"
            >

                <ng-template let-option pTemplate="item">
                    <p-tag
                        [value]="option.label"
                        [severity]="getSeverity(option.value)"
                        styleClass="mr-2"
                    ></p-tag>
                </ng-template>

                <ng-template let-option pTemplate="selectedItem">
                    <p-tag
                        [value]="option.label"
                        [severity]="getSeverity(option.value)"
                        styleClass="mr-2"
                    ></p-tag>
                </ng-template>

            </p-select>
        </div>
    `,
    styles: [`
        .status-filter { display:flex; justify-content:flex-end; margin-bottom:1rem; }
        .status-select { min-width:220px; }
    `]
})
export class StatusFilterContactComponent {

    @Input() selected: ContactStatusFilterValue = 'ALL';
    @Output() statusChange = new EventEmitter<ContactStatusFilterValue>();

    options = [
        { label: 'All', value: 'ALL' },
        { label: 'Pending', value: 'PENDING' },
        { label: 'Read', value: 'READ' }
    ];

    emitChange() {
        this.statusChange.emit(this.selected);
    }

    getSeverity(value: ContactStatusFilterValue) {
        switch (value) {
            case 'PENDING': return 'info';
            case 'READ': return 'success';
            default: return 'info';
        }
    }
}
