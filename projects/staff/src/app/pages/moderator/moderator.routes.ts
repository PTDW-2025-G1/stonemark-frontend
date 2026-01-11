import { Routes } from '@angular/router';
import { ContentProposals } from './content-proposals/content-proposals';
import { ProposalDetailComponent } from './content-proposals/proposal-detail';
import { ContactRequests } from './contact-requests/contact-requests';
import { ManageReports } from './manage-reports/manage-reports';
import { moderatorGuard } from '@core/guards/moderator.guard';

export const moderatorRoutes: Routes = [
  {
    path: 'content-proposals',
    canActivate: [moderatorGuard],
    children: [
      {
        path: '',
        component: ContentProposals
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
