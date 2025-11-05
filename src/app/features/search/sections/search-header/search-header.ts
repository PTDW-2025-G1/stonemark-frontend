import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-header.html'
})
export class SearchHeaderComponent {
  @Input() type: 'monuments' | 'marks' = 'monuments';
  @Input() title: string = '';

  @Output() searchChange = new EventEmitter<string>();

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchChange.emit(input.value);
  }
}
