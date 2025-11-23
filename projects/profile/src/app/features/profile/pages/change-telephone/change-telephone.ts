import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { ProfileService } from 'projects/shared/src/lib/core/services/profile.service';
import { ChangeTelephoneFormComponent } from './sections/change-telephone-form/change-telephone-form';
import { ChangeTelephoneSuccessComponent } from './sections/change-telephone-success/change-telephone-success';

@Component({
  selector: 'app-change-telephone',
  standalone: true,
  imports: [RouterModule, ChangeTelephoneSuccessComponent, ChangeTelephoneFormComponent],
  templateUrl: './change-telephone.html'
})
export class ChangeTelephoneComponent implements OnInit {
  currentTelephone: string = '';
  newTelephone: string = '';
  telephoneChanged: boolean = false;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.loadCurrentTelephone();
  }

  private loadCurrentTelephone(): void {
    this.profileService.getCurrentUser()
      .pipe(take(1))
      .subscribe({
        next: (profile: any) => {
          this.currentTelephone = profile?.telephone || profile?.phone || '';
        },
        error: () => {
          this.currentTelephone = '';
        }
      });
  }

  onSubmitTelephone(newTelephone: string): void {
    this.isSubmitting = true;
    this.errorMessage = '';

    if (newTelephone === this.currentTelephone) {
      this.errorMessage = 'O novo número de telefone tem de ser diferente do atual.';
      this.isSubmitting = false;
      return;
    }

    this.profileService.changeTelephone(newTelephone)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: () => {
          this.newTelephone = newTelephone;
          this.telephoneChanged = true;
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || err?.message || 'Ocorreu um erro ao alterar o número de telefone';
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }
}
