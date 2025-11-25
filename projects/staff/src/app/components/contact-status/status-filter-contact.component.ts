import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { PrimeTemplate } from 'primeng/api';
import { ContactRequest } from '@api/model/contact-request';

export type ContactStatusFilterValue = 'ALL' | ContactRequest.StatusEnum;

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
    { label: 'Pending', value: ContactRequest.StatusEnum.Pending },
    { label: 'In Review', value: ContactRequest.StatusEnum.InReview },
    { label: 'Resolved', value: ContactRequest.StatusEnum.Resolved },
    { label: 'Archived', value: ContactRequest.StatusEnum.Archived }
  ];

  emitChange() {
    this.statusChange.emit(this.selected);
  }

  getSeverity(value: ContactStatusFilterValue) {
    switch (value) {
      case ContactRequest.StatusEnum.Pending: return 'warn';
      case ContactRequest.StatusEnum.InReview: return 'info';
      case ContactRequest.StatusEnum.Resolved: return 'success';
      case ContactRequest.StatusEnum.Archived: return 'secondary';
      default: return 'info';
    }
  }
}
