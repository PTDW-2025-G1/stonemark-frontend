import { Routes } from '@angular/router';
import { ContentProposals } from './content-proposals/content-proposals';
import { ProposalDetailComponent } from './content-proposals/proposal-detail';
import { MarkOccurrenceProposalDetailComponent } from './content-proposals/mark-occurrence-proposal-detail';
import { ContactRequests } from './contact-requests/contact-requests';
import { ManageReports } from './manage-reports/manage-reports';
import { moderatorGuard } from '@core/guards/moderator.guard';
import {ManageMonuments} from './manage-monuments/manage-monuments';
import {CreateMonument} from './manage-monuments/create-monument/create-monument';
import {EditMonument} from './manage-monuments/edit-monument/edit-monument';
import {ManageMarks} from './manage-marks/manage-marks';
import {CreateMark} from './manage-marks/create-mark/create-mark';
import {EditMark} from './manage-marks/edit-mark/edit-mark';
import {ManageMarkOccurrences} from './manage-mark-occurrences/manage-mark-occurrences';
import {CreateMarkOccurrence} from './manage-mark-occurrences/create-mark-occurrence/create-mark-occurrence';
import {EditMarkOccurrence} from './manage-mark-occurrences/edit-mark-occurrence/edit-mark-occurrence';

export const moderatorRoutes: Routes = [
  {
    path: 'monuments',
    canActivate: [moderatorGuard],
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
    path: 'marks',
    canActivate: [moderatorGuard],
    children: [
      {
        path: '',
        component: ManageMarks
      },
      {
        path: 'create',
        component: CreateMark
      },
      {
        path: 'edit/:id',
        component: EditMark
      },
      {
        path: 'occurrences',
        children: [
          {
            path: '',
            component: ManageMarkOccurrences
          },
          {
            path: 'create',
            component: CreateMarkOccurrence
          },
          {
            path: 'edit/:id',
            component: EditMarkOccurrence
          }
        ]
      }
    ]
  },
  {
    path: 'content-proposals',
    canActivate: [moderatorGuard],
    children: [
      {
        path: '',
        component: ContentProposals
      },
      {
        path: 'mark-occurrence/:id',
        component: MarkOccurrenceProposalDetailComponent
      },
      {
        path: ':id',
        component: ProposalDetailComponent
      }
    ]
  },
  {
    path: 'contact-requests',
    canActivate: [moderatorGuard],
    children: [
      {
        path: '',
        component: ContactRequests
      }
    ]
  },
  {
    path: 'manage-reports',
    canActivate: [moderatorGuard],
    children: [
      {
        path: '',
        component: ManageReports
      }
    ]
  }
];
