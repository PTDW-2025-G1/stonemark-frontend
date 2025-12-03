import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'projects/app/src/app/services/keycloak/keycloak.service'; // Adjust path as needed

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {
  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.keycloakService.logout(); // KeycloakService.logout() handles the redirect
  }
}
