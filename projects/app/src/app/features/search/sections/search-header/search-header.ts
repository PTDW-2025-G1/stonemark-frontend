import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedSelectComponent } from '@shared/ui/shared-select/shared-select';
import {TranslatePipe} from '@ngx-translate/core';
import { AdministrativeDivisionDto } from '@api/model/administrative-division-dto';

@Component({
  selector: 'app-search-header',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedSelectComponent, TranslatePipe],
  templateUrl: './search-header.html',
})
export class SearchHeaderComponent {
  @Input() type: 'monuments' | 'marks' = 'monuments';
  @Input() title = '';
  @Input() locations: AdministrativeDivisionDto[] = [];
  @Input() selectedValue: string | number = '';

  @Output() search = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<number>();

  get selectOptions(): { id: string | number; name: string }[] {
    return this.locations.map(loc => ({
      id: loc.id ?? 0,
      name: loc.name ?? ''
    }));
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value);
  }

  selectOption(value: string | number): void {
    this.selectedValue = value;
    this.filterChange.emit(+value);
  }
}
