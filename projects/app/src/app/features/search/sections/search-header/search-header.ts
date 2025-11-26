import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedSelectComponent } from '@shared/ui/shared-select/shared-select';

@Component({
  selector: 'app-search-header',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedSelectComponent],
  templateUrl: './search-header.html',
})
export class SearchHeaderComponent {
  @Input() type: 'monuments' | 'marks' = 'monuments';
  @Input() title = '';
  @Input() locations: string[] = [];
  @Input() monumentsList: { id: number; name: string }[] = [];

  @Output() search = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<string>();

  selectedValue: string | number = '';

  get selectOptions(): { id: string | number; name: string }[] {
    return this.type === 'monuments'
      ? this.locations.map(loc => ({ id: loc, name: loc })) // Use o nome da cidade como id
      : this.monumentsList;
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value);
  }

  selectOption(value: string | number): void {
    this.selectedValue = value;

    if (this.type === 'monuments') {
      this.filterChange.emit(value.toString());
    } else {
      this.filterChange.emit(value.toString());
    }
  }
}
