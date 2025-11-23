import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-header.html',
  styles: [`
    @keyframes slide-down {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-slide-down {
      animation: slide-down 0.2s ease-out;
    }

    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #e5e5e5;
      border-radius: 4px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #d4d4d4;
    }
  `]
})
export class SearchHeaderComponent {
  @Input() type: 'monuments' | 'marks' = 'monuments';
  @Input() title: string = '';
  @Input() locations: string[] = [];
  @Input() monumentsList: { id: number; name: string }[] = [];

  @Output() searchChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<string>();

  isDropdownOpen = false;
  selectedValue = '';
  dropdownSearch = '';

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchChange.emit(input.value);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (!this.isDropdownOpen) {
      this.dropdownSearch = '';
    }
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
    this.dropdownSearch = '';
  }

  selectOption(value: string): void {
    this.selectedValue = value;
    this.filterChange.emit(value);
    this.closeDropdown();
  }

  getSelectedLabel(): string {
    if (!this.selectedValue) {
      return this.type === 'marks' ? 'All Monuments' : 'All Locations';
    }

    if (this.type === 'monuments') {
      return this.selectedValue;
    } else {
      const monument = this.monumentsList.find(m => m.id.toString() === this.selectedValue);
      return monument ? monument.name : 'All Monuments';
    }
  }

  getFilteredLocations(): string[] {
    if (!this.dropdownSearch) {
      return this.locations;
    }
    const search = this.dropdownSearch.toLowerCase();
    return this.locations.filter(loc => loc.toLowerCase().includes(search));
  }

  getFilteredMonuments(): { id: number; name: string }[] {
    if (!this.dropdownSearch) {
      return this.monumentsList;
    }
    const search = this.dropdownSearch.toLowerCase();
    return this.monumentsList.filter(m => m.name.toLowerCase().includes(search));
  }
}
