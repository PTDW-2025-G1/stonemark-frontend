import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Mark } from '@core/models/mark.model';
import {MarkService} from '@core/services/mark.service';
import {ProfileHeaderComponent} from './sections/profile-header/profile-header';
import {ProfileTabsComponent} from './sections/profile-tabs/profile-tabs';
import {ProfileMarksComponent} from './sections/profile-marks/profile-marks';
import {ProfileSuggestionsComponent} from './sections/profile-suggestions/profile-suggestions';
import { Suggestion } from '@core/models/suggestions.model';
import {ProfileService} from '@core/services/profile/profile.service';
import {UserDto} from '@api/model/user-dto';
import {environment} from '@env/environment';
import {AuthService} from '@core/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ProfileHeaderComponent, ProfileTabsComponent, ProfileMarksComponent, ProfileSuggestionsComponent],
  templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit {

  user: any = null;
  loading = true;

  marks: Mark[] = [];
  suggestions: Suggestion[] = [];

  activeTab: 'marks' | 'suggestions' = 'marks';
  suggestionFilter: 'all' | 'validated' | 'pending' | 'rejected' = 'all';

  constructor(private router: Router,
              private profileService: ProfileService,
              private markService: MarkService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadMarks();
    this.loadMockSuggestions();
  }

  loadUserProfile(): void {
    this.profileService.getCurrentUser().subscribe({
      next: (data: UserDto) => {

        const memberSinceString = data.createdAt
          ? data.createdAt.split('T')[0]
          : null;

        this.user = {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          avatar: 'https://i.pravatar.cc/300?img=12',
          memberSince: memberSinceString,
          stats: {
            totalMarks: 0,
            pendings: 0,
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

  loadMarks(): void {
    this.markService.getLastMarks().subscribe(marks => {
      this.marks = marks;
      if (this.user && this.user.stats) {
        this.user.stats.totalMarks = marks.length;
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

    this.user.stats.pendings = this.suggestions.filter(s => s.status === 'pending').length;
    this.user.stats.rejected = this.suggestions.filter(s => s.status === 'rejected').length;
  }

  setTab(tab: 'marks' | 'suggestions') {
    this.activeTab = tab;
  }

  onAddMark() {
    // lógica para adicionar um novo mark
  }

  onEditMark(mark: Mark) {
    // lógica para editar o mark recebido
  }

  onRemoveMark(mark: Mark) {
    // lógica para remover o mark recebido
  }

  onViewMark(mark: Mark) {
    // lógica para ver detalhes do mark recebido
  }

  onCreateSuggestion() {
    // lógica para criar sugestão
  }

  onEditSuggestion(suggestion: Suggestion) {
    // lógica para editar sugestão
  }

  onViewSuggestion(suggestion: Suggestion) {
    // lógica para ver sugestão
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

  changePassword(): void {
    this.router.navigate(['/profile/change-password']);
  }

  changeTelephone(): void {
    this.router.navigate(['/profile/change-telephone']);
  }

  changeEmail(): void {
    this.router.navigate(['/profile/change-email']);
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
