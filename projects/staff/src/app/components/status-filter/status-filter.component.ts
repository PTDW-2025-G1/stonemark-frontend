import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { getSeverity } from '../../utils/severity.util';
import {PrimeTemplate} from 'primeng/api';

export type StatusFilterValue = string;

export interface StatusOption {
    label: string;
    value: string;
}

@Component({
    selector: 'app-status-filter',
    standalone: true,
  imports: [CommonModule, FormsModule, Select, Tag, PrimeTemplate],
    template: `
        <div class="status-filter">
            <p-select [(ngModel)]="selected" [options]="options" optionLabel="label" optionValue="value" placeholder="Filtrar por estado" (onChange)="emitChange()" class="status-select">
                <ng-template let-option pTemplate="item">
                    <p-tag [value]="option.label" [severity]="getSeverity(option.value)"></p-tag>
                </ng-template>
                <ng-template let-option pTemplate="selectedItem">
                    <p-tag [value]="option.label" [severity]="getSeverity(option.value)"></p-tag>
                </ng-template>
            </p-select>
        </div>
    `,
    styles: [`
        .status-filter { display:flex; justify-content:flex-end; margin-bottom:1rem; }
        .status-select { min-width:220px; }
    `]
})
export class StatusFilterComponent {
    @Input() selected: StatusFilterValue = 'ALL';
    @Input() options: StatusOption[] = [
        { label: 'All', value: 'ALL' },
        { label: 'Pending', value: 'PENDING' },
        { label: 'Approved', value: 'APPROVED' },
        { label: 'Rejected', value: 'REJECTED' }
    ];
    @Output() statusChange = new EventEmitter<StatusFilterValue>();

    emitChange() {
        this.statusChange.emit(this.selected);
    }


    protected readonly getSeverity = getSeverity;
}
