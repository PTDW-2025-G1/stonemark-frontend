import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent {
  constructor(private authService: AuthService) {
    this.authService.logout().subscribe(() => {
      window.location.href = `${environment.authUrl}/login`;
    });
  }
}
