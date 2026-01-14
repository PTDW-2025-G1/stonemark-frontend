import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shared-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shared-select.html',
})
export class SharedSelectComponent {
  @Input() options: any[] = [];
  @Input() selected: string | number = '';
  @Input() label: string = 'Select';
  @Input() searchable: boolean = false;
  @Input() optionLabelKey: string = 'name';
  @Input() optionValueKey: string = 'id';
  @Input() allowPlaceholderSelection: boolean = true;

  @Output() selectionChange = new EventEmitter<string | number>();

  isDropdownOpen = false;
  dropdownSearch = '';

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (!this.isDropdownOpen) this.dropdownSearch = '';
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
    this.dropdownSearch = '';
  }

  selectOption(value: string | number): void {
    this.selectionChange.emit(value);
    this.closeDropdown();
  }

  getSelectedLabel(): string {
    if (!this.selected && this.selected !== 0) return this.label;
    const found = this.options.find(opt => opt[this.optionValueKey].toString() === this.selected.toString());
    return found ? found[this.optionLabelKey] : this.label;
  }

  getFilteredOptions(): any[] {
    if (!this.dropdownSearch) return this.options;
    const search = this.dropdownSearch.toLowerCase();
    return this.options.filter(opt =>
      opt[this.optionLabelKey].toLowerCase().includes(search)
    );
  }
}
