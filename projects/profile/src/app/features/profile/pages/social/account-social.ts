import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccountSocialService } from '@core/services/account/account-social/account-social.service';
import { environment } from '@env/environment';
import { LinkedProviderDto } from '@api/model/linked-provider-dto';
import {BreadcrumbProfileComponent} from '@shared/ui/breadcrumb-profile/breadcrumb-profile';
import {ProfileService} from '@core/services/profile/profile.service';

declare const google: any;

@Component({
  selector: 'app-account-social',
  standalone: true,
  imports: [CommonModule, BreadcrumbProfileComponent, RouterLink],
  templateUrl: './account-social.html'
})
export class AccountSocialComponent implements OnInit {

  loading = false;
  message: string | null = null;
  isGoogleLinked = false;
  mustSetPassword = false;
  hasPassword = false;
  checkingSecurity = false;
  providersCount = 0;

  constructor(
    private accountSocialService: AccountSocialService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.loadLinkedProviders();
    this.loadSecurityStatus();
  }

  // --------------------------------------------------
  // Initial state
  // --------------------------------------------------

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

  private loadSecurityStatus(): void {
    this.checkingSecurity = true;

    this.profileService.getSecurityStatus().subscribe({
      next: (status) => {
        this.hasPassword = status.hasPassword;
        this.checkingSecurity = false;
      },
      error: () => {
        this.hasPassword = false;
        this.checkingSecurity = false;
      }
    });
  }

  // --------------------------------------------------
  // Google linking
  // --------------------------------------------------

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
    return this.isGoogleLinked && this.providersCount === 1 && !this.hasPassword;
  }

}
