import { Routes } from '@angular/router';
import { ModeratorMarksSubmissionsComponent } from './marks-submissions/marks-submissions';
import { ContentProposals } from './content-proposals/content-proposals';
import { ContactRequests } from './contact-requests/contact-requests';
import { ManageReports } from './manage-reports/manage-reports';
import { moderatorGuard } from '@core/guards/moderator.guard';

export const moderatorRoutes: Routes = [
  {
    path: 'marks-submissions',
    canActivate: [moderatorGuard],
    children: [
      {
        path: '',
        component: ModeratorMarksSubmissionsComponent
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
