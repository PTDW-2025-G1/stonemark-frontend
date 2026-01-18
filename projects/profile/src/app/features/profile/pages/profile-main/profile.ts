import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import {ProfileHeaderComponent} from './sections/profile-header/profile-header';
import {ProfileTabsComponent} from './sections/profile-tabs/profile-tabs';
import {ProfileMarksComponent} from './sections/profile-marks/profile-marks';
import {ProfileSuggestionsComponent} from './sections/profile-suggestions/profile-suggestions';
import { Suggestion } from '@core/models/suggestions.model';
import {ProfileService} from '@core/services/profile/profile.service';
import {UserDto} from '@api/model/user-dto';
import {environment} from '@env/environment';
import {AuthService} from '@core/services/auth/auth.service';
import { MarkOccurrenceProposalService } from '@core/services/proposal/mark-occurrence-proposal.service';
import { MarkOccurrenceProposalListDto } from '@api/model/mark-occurrence-proposal-list-dto';
import { PaginationFacade } from '@shared/facades/pagination.facade';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ProfileHeaderComponent, ProfileTabsComponent, ProfileMarksComponent, ProfileSuggestionsComponent],
  templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit {

  user: any = null;
  loading = true;

  occurrences: MarkOccurrenceProposalListDto[] = [];
  suggestions: Suggestion[] = [];

  activeTab: 'marks' | 'suggestions' = 'marks';
  suggestionFilter: 'all' | 'validated' | 'pending' | 'rejected' = 'all';

  marksPagination = new PaginationFacade<MarkOccurrenceProposalListDto>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private profileService: ProfileService,
              private markOccurrenceProposalService: MarkOccurrenceProposalService,
              private authService: AuthService) {}

  ngOnInit(): void {
    const pageParam = this.route.snapshot.queryParamMap.get('page');
    const page = pageParam ? parseInt(pageParam, 10) - 1 : 0;
    this.loadUserProfile();
    this.loadMarks(page);
    this.loadMockSuggestions();
    this.loadUserStats();
    this.profileService.getSecurityStatus().subscribe();
  }

  loadUserProfile(): void {
    this.profileService.getCurrentUser().subscribe({
      next: (data: UserDto) => {
        const memberSinceString = data.createdAt
          ? data.createdAt.split('T')[0]
          : null;

        this.user = {
          name: `${data.firstName} ${data.lastName}`,
          username: data.username ? `@${data.username}` : undefined,
          memberSince: memberSinceString,
          role: data.role,
          photoId: data.photoId,
          stats: {
            accepted: 0,
            under_review: 0,
            rejected: 0
          }
        };
        this.loading = false;
      },
      error: err => {
        console.error('Failed to load user:', err);
        this.loading = false;
      }
    });
  }

  loadMarks(page: number = 0): void {
    this.profileService.getCurrentUser().subscribe({
      next: (data: UserDto) => {
        if (typeof data.id === 'number') {
          this.markOccurrenceProposalService.findByUser(data.id, page, 6).subscribe((pageResponse) => {
            this.occurrences = pageResponse.content ?? [];
            this.marksPagination.setServerPage(
              (pageResponse.number ?? 0) + 1,
              pageResponse.totalPages ?? 1
            );
          });
        } else {
          this.occurrences = [];
        }
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

  loadUserStats(): void {
    this.profileService.getCurrentUser().subscribe({
      next: (data: UserDto) => {
        if (typeof data.id === 'number') {
          this.markOccurrenceProposalService.getUserStats(data.id).subscribe(stats => {
            this.user.stats = {
              accepted: stats.accepted,
              under_review: stats.underReview,
              rejected: stats.rejected
            };
          });
        }
      }
    });
  }

  setTab(tab: 'marks' | 'suggestions') {
    this.activeTab = tab;
  }

  onViewOccurrence(proposalId: number): void {
    this.router.navigate(['/proposals', proposalId]);
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

  editProfile(): void {
    this.router.navigate(['/profile/edit']);
  }

  setPassword(): void {
    this.router.navigate(['/profile/set-password']);
  }

  changePassword(): void {
    this.router.navigate(['/profile/change-password']);
  }

  openSecurity(): void {
    this.router.navigate(['/profile/security']);
  }

  openContacts(): void {
    this.router.navigate(['/profile/contacts']);
  }

  openSocial(): void {
    this.router.navigate(['/profile/social']);
  }

  goToStaff(): void {
    window.location.href = environment.staffUrl;
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        window.location.href = environment.authUrl + '/login';
      },
      error: () => {
        window.location.href = environment.authUrl + '/login';
      }
    });
  }
}
