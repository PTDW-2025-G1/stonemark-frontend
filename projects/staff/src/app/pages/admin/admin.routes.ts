import {Routes} from '@angular/router';
import {ManageUsers} from './manage-users/manage-users';
import {adminGuard} from '@core/guards/admin.guard';
import { EditUserComponent } from './manage-users/edit-user/edit-user';
import { ManageDivisions } from './manage-divisions/manage-divisions';

export const adminRoutes: Routes = [
  {
    path: 'users',
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        component: ManageUsers
      },
      {
        path: 'edit/:id',
        component: EditUserComponent
      }
    ]
  },
  {
    path: 'divisions',
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        component: ManageDivisions
      }
    ]
  },
];
