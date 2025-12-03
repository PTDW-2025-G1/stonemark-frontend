import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { ProfileService } from '@core/services/profile/profile.service';
import { ChangeTelephoneFormComponent } from './sections/change-telephone-form/change-telephone-form';
import { ChangeTelephoneSuccessComponent } from './sections/change-telephone-success/change-telephone-success';
import { TelephoneChangeRequestDto } from '@api/model/telephone-change-request-dto';
import { TelephoneCodeVerificationDto } from '@api/model/telephone-code-verification-dto';

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
  awaitingCode: boolean = false;
  code: string = '';

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
      this.errorMessage = 'The new telephone number must be different from the current one.';
      this.isSubmitting = false;
      return;
    }

    const request: TelephoneChangeRequestDto = { newTelephone };

    this.profileService.requestTelephoneChange(request)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: () => {
          this.newTelephone = newTelephone;
          this.awaitingCode = true;
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || err?.message || 'Ocorreu um erro ao alterar o número de telefone';
        }
      });
  }

  onVerifyCode(code: string): void {
    this.isSubmitting = true;
    this.errorMessage = '';

    const request: TelephoneCodeVerificationDto = {
      newTelephone: this.newTelephone,
      code
    };

    this.profileService.verifyTelephoneChange(request)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: () => {
          this.telephoneChanged = true;
          this.awaitingCode = false;
          this.currentTelephone = this.newTelephone;
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || err?.message || 'Código inválido ou expirado.';
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }
}
