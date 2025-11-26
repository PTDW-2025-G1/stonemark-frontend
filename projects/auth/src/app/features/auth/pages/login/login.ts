import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { AuthFormComponent } from '../../components/auth-form/auth-form';
import { BaseAuthComponent } from '@shared/directives/base-auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AuthFormComponent],
  template: `
    <section class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      <app-auth-form
        mode="login"
        [loading]="loading"
        [errorMsg]="errorMsg"
        (submit)="onSubmit($event)"
        (toggleMode)="onToggleMode()"
        (googleAuth)="onGoogleAuth()"
        (forgotPassword)="onForgotPassword()"
      />
    </section>

    <script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-login="stonemarkbot" data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></script>
    <script type="text/javascript">
      function onTelegramAuth(user) {
        alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
      }
    </script>
  `
})
export class LoginComponent extends BaseAuthComponent {
  override mode: 'login' = 'login';
  override navigateTo = '/register';

  constructor(router: Router, authService: AuthService) {
    super(router, authService);
  }
}
