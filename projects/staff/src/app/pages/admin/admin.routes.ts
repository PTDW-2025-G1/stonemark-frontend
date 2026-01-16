import {Routes} from '@angular/router';
import {ManageMonuments} from './manage-monuments/manage-monuments';
import {CreateMonument} from './manage-monuments/create-monument/create-monument';
import {EditMonument} from './manage-monuments/edit-monument/edit-monument';
import {ManageUsers} from './manage-users/manage-users';
import {adminGuard} from '@core/guards/admin.guard';
import { EditUserComponent } from './manage-users/edit-user/edit-user';
import { ManageDivisions } from './manage-divisions/manage-divisions';

export const adminRoutes: Routes = [
  {
    path: 'monuments',
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        component: ManageMonuments
      },
      {
        path: 'create',
        component: CreateMonument
      },
      {
        path: 'edit/:id',
        component: EditMonument
      }
    ]
  },
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
  }
];
