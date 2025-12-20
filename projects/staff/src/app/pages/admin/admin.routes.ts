import {Routes} from '@angular/router';
import {ManageMonuments} from './manage-monuments/manage-monuments';
import {CreateMonument} from './manage-monuments/create-monument/create-monument';
import {EditMonument} from './manage-monuments/edit-monument/edit-monument';
import {ManageUsers} from './manage-users/manage-users';
import {adminGuard} from '@core/guards/admin.guard';

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
      }
    ]
  }
];
