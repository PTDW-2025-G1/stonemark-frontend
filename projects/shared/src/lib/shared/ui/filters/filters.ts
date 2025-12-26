import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedSelectComponent } from '../shared-select/shared-select';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, SharedSelectComponent, SafeHtmlPipe],
  templateUrl: './filters.html'
})
export class FiltersComponent {
  @Input() sortOrder: 'asc' | 'desc' = 'desc';
  @Input() filterOptions: any[] = [];
  @Input() selectedFilterValue: any = '';
  @Input() filterLabel: string = 'Filter';
  @Input() filterIcon: string = 'bi-filter';
  @Input() filterIconHtml: string = '';
  @Input() filterPlaceholder: string = 'All';
  @Input() optionLabelKey: string = 'name';
  @Input() optionValueKey: string = 'id';

  @Output() sortChange = new EventEmitter<'asc' | 'desc'>();
  @Output() filterChange = new EventEmitter<any>();

  onSortChange(order: 'asc' | 'desc'): void {
    this.sortChange.emit(order);
  }

  onFilterChange(value: any): void {
    this.filterChange.emit(value);
  }
}
