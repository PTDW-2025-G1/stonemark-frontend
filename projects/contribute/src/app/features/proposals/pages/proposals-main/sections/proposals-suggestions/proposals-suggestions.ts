import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Suggestion } from '@core/models/suggestions.model';

@Component({
  selector: 'app-proposals-suggestions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proposals-suggestions.html'
})
export class ProposalsSuggestionsComponent {
  @Input() suggestions: Suggestion[] = [];
  @Input() suggestionFilter: 'all' | 'validated' | 'pending' | 'rejected' = 'all';
  @Input() getFilteredSuggestions: () => Suggestion[] = () => [];
  @Input() getFilteredCount: (status: 'validated' | 'pending' | 'rejected') => number = () => 0;

  @Output() editSuggestion = new EventEmitter<Suggestion>();
  @Output() viewSuggestion = new EventEmitter<Suggestion>();
  @Output() filterChange = new EventEmitter<'all' | 'validated' | 'pending' | 'rejected'>();

  onFilterChange(filter: 'all' | 'validated' | 'pending' | 'rejected') {
    this.filterChange.emit(filter);
  }
}
