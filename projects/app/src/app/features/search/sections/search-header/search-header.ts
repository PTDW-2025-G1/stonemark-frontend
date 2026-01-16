import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
export class SearchHeaderComponent implements OnChanges {
  @Input() type: 'monuments' | 'marks' = 'monuments';
  @Input() title = '';
  @Input() districts: AdministrativeDivisionDto[] = [];
  @Input() municipalities: AdministrativeDivisionDto[] = [];
  @Input() parishes: AdministrativeDivisionDto[] = [];

  @Input() selectedDistrictId: number | null = null;
  @Input() selectedMunicipalityId: number | null = null;
  @Input() selectedParishId: number | null = null;

  @Output() search = new EventEmitter<string>();
  @Output() districtChange = new EventEmitter<number | null>();
  @Output() municipalityChange = new EventEmitter<number | null>();
  @Output() parishChange = new EventEmitter<number | null>();

  get districtOptions(): { id: string | number; name: string }[] {
    return this.districts.map(loc => ({
      id: loc.id ?? 0,
      name: loc.name ?? ''
    }));
  }

  get municipalityOptions(): { id: string | number; name: string }[] {
    return this.municipalities.map(loc => ({
      id: loc.id ?? 0,
      name: loc.name ?? ''
    }));
  }

  get parishOptions(): { id: string | number; name: string }[] {
    return this.parishes.map(loc => ({
      id: loc.id ?? 0,
      name: loc.name ?? ''
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
      // React to changes if needed
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value);
  }

  selectDistrict(value: string | number): void {
    this.districtChange.emit(value ? +value : null);
  }

  selectMunicipality(value: string | number): void {
    this.municipalityChange.emit(value ? +value : null);
  }

  selectParish(value: string | number): void {
    this.parishChange.emit(value ? +value : null);
  }
}
