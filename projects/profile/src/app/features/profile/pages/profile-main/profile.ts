import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import {ProfileHeaderComponent} from './sections/profile-header/profile-header';
import {AccountService} from '@core/services/account/account.service';
import {UserDto} from '@api/model/user-dto';
import {environment} from '@env/environment';
import {AuthService} from '@core/services/auth/auth.service';
import { ProposalService } from '@core/services/proposal/proposal.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ProfileHeaderComponent],
  templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit {

  user: any = null;
  loading = true;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private profileService: AccountService,
              private proposalService: ProposalService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserProfile();
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

  loadUserStats(): void {
    this.profileService.getCurrentUser().subscribe({
      next: (data: UserDto) => {
        if (typeof data.id === 'number') {
          this.proposalService.getUserStats().subscribe(stats => {
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

  goToProposals(): void {
    window.location.href = environment.contributeUrl + '/proposals';
  }
}
