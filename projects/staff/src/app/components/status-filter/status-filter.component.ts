import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { getSeverity } from '../../utils/severity.util';
import {PrimeTemplate} from 'primeng/api';

export type StatusFilterValue = 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED';

@Component({
    selector: 'app-status-filter',
    standalone: true,
  imports: [CommonModule, FormsModule, Select, Tag, PrimeTemplate],
    template: `
        <div class="status-filter">
            <p-select [(ngModel)]="selected" [options]="options" optionLabel="label" optionValue="value" placeholder="Filtrar por estado" (onChange)="emitChange()" class="status-select">
                <ng-template let-option pTemplate="item">
                    <p-tag [value]="option.label" [severity]="getSeverity(option.value)" styleClass="mr-2"></p-tag>
                </ng-template>
                <ng-template let-value pTemplate="selectedItem">
                    <p-tag [value]="getLabel(value)" [severity]="getSeverity(value)" styleClass="mr-2"></p-tag>
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
    @Output() statusChange = new EventEmitter<StatusFilterValue>();

    options = [
        { label: 'Todas', value: 'ALL' },
        { label: 'Pendentes', value: 'PENDING' },
        { label: 'Aprovadas', value: 'APPROVED' },
        { label: 'Rejeitadas', value: 'REJECTED' }
    ];

    emitChange() {
        this.statusChange.emit(this.selected);
    }

    getLabel(value: StatusFilterValue): string {
        return this.options.find(o => o.value === value)?.label || 'Todas';
    }

    protected readonly getSeverity = getSeverity;
}
