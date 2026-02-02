import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Suggestion } from '@core/models/suggestions.model';
import {AccountService} from '@core/services/account/account.service';
import {UserDto} from '@api/model/user-dto';
import { MarkOccurrenceProposalService } from '@core/services/proposal/mark-occurrence/mark-occurrence-proposal.service';
import { MarkOccurrenceProposalListDto } from '@api/model/mark-occurrence-proposal-list-dto';
import { PaginationFacade } from '@shared/facades/pagination.facade';
import { ProposalService } from '@core/services/proposal/proposal.service';
import {ProposalsTabsComponent} from './sections/proposals-tabs/proposals-tabs';
import {ProposalsMarksComponent} from './sections/proposals-marks/proposals-marks';
import {ProposalsSuggestionsComponent} from './sections/proposals-suggestions/proposals-suggestions';
import {environment} from '@env/environment';

@Component({
  selector: 'app-proposals',
  standalone: true,
  imports: [CommonModule, RouterModule, ProposalsTabsComponent, ProposalsMarksComponent, ProposalsSuggestionsComponent],
  templateUrl: './proposals.html'
})
export class ProposalsComponent implements OnInit {

  loading = true;
  marksLoading = true;

  occurrences: MarkOccurrenceProposalListDto[] = [];
  suggestions: Suggestion[] = [];

  activeTab: 'marks' | 'suggestions' = 'marks';
  suggestionFilter: 'all' | 'validated' | 'pending' | 'rejected' = 'all';

  marksPagination = new PaginationFacade<MarkOccurrenceProposalListDto>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private profileService: AccountService,
              private markOccurrenceProposalService: MarkOccurrenceProposalService,
              private proposalService: ProposalService) {}

  ngOnInit(): void {
    const pageParam = this.route.snapshot.queryParamMap.get('page');
    const page = pageParam ? parseInt(pageParam, 10) - 1 : 0;
    this.loadMarks(page);
    this.loadMockSuggestions();
  }

  loadMarks(page: number = 0): void {
    this.marksLoading = true;
    this.profileService.getCurrentUser().subscribe({
      next: (data: UserDto) => {
        if (typeof data.id === 'number') {
          this.markOccurrenceProposalService.findByCurrentUser(page).subscribe({
            next: (pageResponse) => {
              this.occurrences = pageResponse.content ?? [];
              this.marksPagination.setServerPage(
                (pageResponse.number ?? 0) + 1,
                pageResponse.totalPages ?? 1
              );
              this.marksLoading = false;
            },
            error: (err) => {
              console.error('Failed to load marks:', err);
              this.occurrences = [];
              this.marksLoading = false;
            }
          });
        } else {
          this.occurrences = [];
          this.marksLoading = false;
        }
      },
      error: (err) => {
        console.error('Failed to load user for marks:', err);
        this.occurrences = [];
        this.marksLoading = false;
      }
    });
  }

  loadMockSuggestions(): void {
    this.suggestions = [
      {
        id: 1,
        monumentName: 'Castelo de Guimarães',
        monumentImage: 'https://t3.ftcdn.net/jpg/03/93/35/48/360_F_393354815_Ju7YcCJ6QHbhBahy3FeQpcObzkl03faD.jpg',
        type: 'description',
        description: 'Update historical description including findings.',
        status: 'validated',
        submittedDate: '15 Oct 2024',
        appliedDate: '22 Oct 2024'
      },
      {
        id: 2,
        monumentName: 'Torre de Belém',
        monumentImage: 'https://static-resources-elementor.mirai.com/wp-content/uploads/sites/1079/post_04_featured.jpg',
        type: 'images',
        description: 'Added new high-res interior photos.',
        status: 'pending',
        submittedDate: '8 Nov 2024'
      },
      {
        id: 3,
        monumentName: 'Mosteiro dos Jerónimos',
        monumentImage: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Mosteiro_dos_Jeronimos_-_Left_Wing.jpg',
        type: 'date',
        description: 'Suggested updated construction start date.',
        status: 'rejected',
        submittedDate: '1 Nov 2024',
        rejectionReason: 'Date already verified by official sources'
      }
    ];
  }

  setTab(tab: 'marks' | 'suggestions') {
    this.activeTab = tab;
  }

  onViewOccurrence(proposalId: number): void {
    this.router.navigate(['/proposals/mark-occurrence', proposalId]);
  }

  onMarksPageChange(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });

    this.loadMarks(page - 1);
  }

  onEditSuggestion(suggestion: Suggestion) {
    // to:do in the next version 2.0
  }

  onViewSuggestion(suggestion: Suggestion) {
    // to:do in the next version 2.0
  }

  onSuggestionFilterChange(filter: 'all' | 'validated' | 'pending' | 'rejected') {
    this.suggestionFilter = filter;
  }

  getFilteredSuggestions(): Suggestion[] {
    if (this.suggestionFilter === 'all') return this.suggestions;
    return this.suggestions.filter(s => s.status === this.suggestionFilter);
  }

  getFilteredCount(status: 'validated' | 'pending' | 'rejected'): number {
    return this.suggestions.filter(s => s.status === status).length;
  }

  goBack(): void {
    window.location.href = environment.profileUrl + '/profile';
  }
}
