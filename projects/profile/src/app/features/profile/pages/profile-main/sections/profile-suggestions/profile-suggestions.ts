import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Suggestion } from '@core/models/suggestions.model';

@Component({
  selector: 'app-profile-suggestions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-suggestions.html'
})
export class ProfileSuggestionsComponent {
  @Input() suggestions: Suggestion[] = [];
  @Input() suggestionFilter: 'all' | 'validated' | 'pending' | 'rejected' = 'all';
  @Input() getFilteredSuggestions: () => Suggestion[] = () => [];
  @Input() getFilteredCount: (status: 'validated' | 'pending' | 'rejected') => number = () => 0;

  @Output() createSuggestion = new EventEmitter<void>();
  @Output() editSuggestion = new EventEmitter<Suggestion>();
  @Output() viewSuggestion = new EventEmitter<Suggestion>();
  @Output() filterChange = new EventEmitter<'all' | 'validated' | 'pending' | 'rejected'>();

  onFilterChange(filter: 'all' | 'validated' | 'pending' | 'rejected') {
    this.filterChange.emit(filter);
  }
}
