import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccountSocialService } from '@core/services/account/account-social.service';
import { environment } from '@env/environment';
import { LinkedProviderDto } from '@api/model/linked-provider-dto';
import {BreadcrumbProfileComponent} from '@shared/ui/breadcrumb-profile/breadcrumb-profile';
import {AccountService} from '@core/services/account/account.service';
import {ButtonComponent} from '@shared/ui/button/button';

declare const google: any;

@Component({
  selector: 'app-account-social',
  standalone: true,
  imports: [CommonModule, BreadcrumbProfileComponent, RouterLink, ButtonComponent],
  templateUrl: './account-social.html'
})
export class AccountSocialComponent implements OnInit {

  loading = false;
  message: string | null = null;
  isGoogleLinked = false;
  providersCount = 0;

  constructor(
    private accountSocialService: AccountSocialService,
    public profileService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadLinkedProviders();
    this.profileService.getSecurityStatus().subscribe();
  }

  private loadLinkedProviders(): void {
    this.accountSocialService.getLinkedProviders().subscribe({
      next: (providers) => {
        this.providersCount = providers.length;

        this.isGoogleLinked = providers.some(
          p => p.provider === LinkedProviderDto.ProviderEnum.Google
        );

        if (!this.isGoogleLinked) {
          this.initGoogle();
        }
      },
      error: () => {
        console.error('Failed to load linked providers');
      }
    });
  }


  private initGoogle(): void {
    if (typeof google === 'undefined') {
      console.error('Google Identity Services not loaded');
      return;
    }

    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => {
        this.connectGoogle(response.credential);
      }
    });
  }

  startGoogleLinking(): void {
    this.message = null;
    google.accounts.id.prompt();
  }

  private connectGoogle(idToken: string): void {
    this.loading = true;

    this.accountSocialService.linkGoogle(idToken).subscribe({
      next: (res) => {
        this.isGoogleLinked = true;
        this.message = res.message ?? 'Google account successfully linked.';
        this.loading = false;
      },
      error: () => {
        this.message = 'Unable to link Google account.';
        this.loading = false;
      }
    });
  }

  disconnectGoogle(): void {
    if (this.mustDefinePassword) {
      return;
    }

    this.loading = true;
    this.message = null;

    this.accountSocialService.unlinkGoogle().subscribe({
      next: (res) => {
        this.isGoogleLinked = false;
        this.message = res.message ?? 'Google account disconnected.';
        this.loading = false;
        this.initGoogle();
      },
      error: () => {
        this.loading = false;
        this.message = 'Unable to disconnect Google account.';
      }
    });
  }

  get mustDefinePassword(): boolean {
    const hasPassword = this.profileService.getHasPassword();
    return this.isGoogleLinked && this.providersCount === 1 && !hasPassword;
  }

}
