import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import {ProfileService, UserDto} from '../../../../../../projects/shared/src/lib/core/services/profile.service';
import {AuthService} from '../../../../../../projects/shared/src/lib/core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit {
  user: any = null;
  loading = true;

  constructor(private router: Router, private profileService: ProfileService, private authService : AuthService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.profileService.getCurrentUser().subscribe({
      next: (data: UserDto) => {
        this.user = {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          avatar: 'https://i.pravatar.cc/300?img=12',
          memberSince: new Date(data.createdAt).toLocaleString('default', {
            month: 'long',
            year: 'numeric'
          }),
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

  editProfile(): void {
    this.router.navigate(['/profile/edit']);
  }

  changePassword(): void {
    this.router.navigate(['/profile/change-password']);
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }
}
