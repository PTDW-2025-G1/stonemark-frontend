import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

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

  ngOnInit(): void {
    this.model = [
      {
        label: 'StoneMark - Management Options',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
          { label: 'Marks Submissions', icon: 'pi pi-fw pi-tag', routerLink: ['/moderator/marks-submissions'] },
          { label: 'Content Proposals', icon: 'pi pi-fw pi-file-edit', routerLink: ['/moderator/content-proposals'] },
          { label: 'Contact Requests', icon: 'pi pi-envelope', routerLink: ['/moderator/contact-requests'] },
          { label: 'Manage Reports', icon: 'pi pi-flag', routerLink: ['/moderator/manage-reports'] },
          { label: 'Manage Users', icon: 'pi pi-fw pi-users', routerLink: ['/admin/users'] },
          { label: 'Manage Monuments', icon: 'pi pi-fw pi-map', routerLink: ['/admin/monuments'] },
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            items: [
              { label: 'Logout', icon: 'pi pi-fw pi-sign-out', routerLink: ['/logout'] }
            ]
          },
          { label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/pages/notfound'] },
          { label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/pages/empty'] }
        ]
      },
    ];
  }
}
