import {Routes} from '@angular/router';
import {ManageMonuments} from './manage-monuments/manage-monuments';
import {CreateMonument} from './manage-monuments/create-monument/create-monument';
import {EditMonument} from './manage-monuments/edit-monument/edit-monument';
import {ManageModerators} from './manage-moderators/manage-moderators';

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
    path: 'moderators',
    children: [
      {
        path: '',
        component: ManageModerators
      }
    ]
  }
];
