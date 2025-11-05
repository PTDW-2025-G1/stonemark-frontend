import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SearchFilters {
  location?: boolean;
  monument?: boolean;
  artist?: boolean;
  material?: boolean;
  architect?: boolean;
  startDate?: boolean;
}

export interface FilterValues {
  location?: string;
  monument?: string;
  artist?: string;
  material?: string[];
  architect?: string;
  startDate?: number;
}

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-filters.html'
})
export class SearchFiltersComponent {
  @Input() filters: SearchFilters = {};

  @Output() filtersChange = new EventEmitter<FilterValues>();

  private currentFilters: FilterValues = {
    material: []
  };

  onFilterChange(filterName: string, event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const value = target.value;

    this.currentFilters = {
      ...this.currentFilters,
      [filterName]: value || undefined
    };

    this.filtersChange.emit(this.currentFilters);
  }

  onMaterialChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (!this.currentFilters.material) {
      this.currentFilters.material = [];
    }

    if (target.checked) {
      this.currentFilters.material.push(value);
    } else {
      this.currentFilters.material = this.currentFilters.material.filter(m => m !== value);
    }

    this.filtersChange.emit(this.currentFilters);
  }

  onClearFilters(): void {
    this.currentFilters = { material: [] };
    this.filtersChange.emit(this.currentFilters);

    const form = document.querySelector('aside form');
    if (form) {
      (form as HTMLFormElement).reset();
    }
  }
}
