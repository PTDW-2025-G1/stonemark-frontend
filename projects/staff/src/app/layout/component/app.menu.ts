import {Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { environment } from '@env/environment';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule],
  template: `
    <ul class="layout-menu">
      <ng-container *ngFor="let item of model; let i = index">
        <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
        <li *ngIf="item.separator" class="menu-separator"></li>
      </ng-container>
    </ul>
  `
})
export class AppMenu implements OnInit {
  model: MenuItem[] = [];

  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    const userRole = this.authService.getRole();
    const isAdmin = userRole === 'ADMIN';

    const allItems: MenuItem[] = [
      { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
      { label: 'Content Proposals', icon: 'pi pi-fw pi-file-edit', routerLink: ['/moderator/content-proposals'] },
      { label: 'Contact Requests', icon: 'pi pi-envelope', routerLink: ['/moderator/contact-requests'] },
      { label: 'Manage Reports', icon: 'pi pi-flag', routerLink: ['/moderator/manage-reports'] },
      { label: 'Manage Users', icon: 'pi pi-fw pi-users', routerLink: ['/admin/users'], visible: isAdmin },
      { label: 'Manage Monuments', icon: 'pi pi-fw pi-map', routerLink: ['/moderator/monuments'] },
      { label: 'Manage Marks', icon: 'pi pi-fw pi-bookmark', routerLink: ['/moderator/marks'] },
      { label: 'Manage Divisions', icon: 'pi pi-fw pi-sitemap', routerLink: ['/admin/divisions'], visible: isAdmin },
      { label: 'My Profile', icon: 'pi pi-fw pi-user', url: environment.profileUrl + '/profile' },
      { label: 'Logout', icon: 'pi pi-fw pi-sign-out', routerLink: ['/logout'] }
    ];

    this.model = [
      {
        label: 'StoneMark - Management Options',
        items: allItems.filter(item => item.visible !== false)
      },
    ];
  }
}
