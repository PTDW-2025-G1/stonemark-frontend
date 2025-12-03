import {Routes} from '@angular/router';
import {ManageMonuments} from './manage-monuments/manage-monuments';
import {CreateMonument} from './manage-monuments/create-monument/create-monument';
import {EditMonument} from './manage-monuments/edit-monument/edit-monument';
import {ManageUsers} from './manage-users/manage-users';

export const adminRoutes: Routes = [
  {
    path: 'monuments',
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
    children: [
      {
        path: '',
        component: ManageUsers
      }
    ]
  }
];
