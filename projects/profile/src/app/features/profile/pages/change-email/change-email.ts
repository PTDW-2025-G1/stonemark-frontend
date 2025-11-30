import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { ProfileService } from '@core/services/profile/profile.service';
import { ChangeEmailFormComponent } from './sections/change-email-form/change-email-form';
import { ChangeEmailSuccessComponent } from './sections/change-email-success/change-email-success';

@Component({
  selector: 'app-change-email',
  standalone: true,
  imports: [RouterModule, ChangeEmailFormComponent, ChangeEmailSuccessComponent],
  templateUrl: './change-email.html'
})
export class ChangeEmailComponent implements OnInit {
  currentEmail: string = '';
  newEmail: string = '';
  emailChanged: boolean = false;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.loadCurrentEmail();
  }

  private loadCurrentEmail(): void {
    this.profileService.getCurrentUser()
      .pipe(take(1))
      .subscribe({
        next: (profile: any) => {
          this.currentEmail = profile?.email || '';
        },
        error: () => {
          this.currentEmail = '';
        }
      });
  }

  onSubmitEmail(newEmail: string): void {
    this.isSubmitting = true;
    this.errorMessage = '';

    if (newEmail === this.currentEmail) {
      this.errorMessage = 'O novo email tem de ser diferente do atual.';
      this.isSubmitting = false;
      return;
    }

    this.profileService.changeEmail(newEmail)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: () => {
          this.newEmail = newEmail;
          this.emailChanged = true;
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || err?.message || 'Ocorreu um erro ao alterar o email';
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }

  openEmail(): void {
    window.location.href = 'mailto:';
  }
}
