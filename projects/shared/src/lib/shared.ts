import { Component } from '@angular/core';
export * from './core/keycloak/keycloak.service';
export * from './core/keycloak/user-profile';
export * from './core/guards/auth.guard';
export * from './core/guards/role.guard';
export * from './core/interceptors/auth.interceptor';
export * from './core/services/cookie.service';

@Component({
  selector: 'lib-shared',
  imports: [],
  template: `
    <p>
      shared works!
    </p>
  `,
  styles: ``,
})
export class Shared {

}
