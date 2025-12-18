import { Routes } from '@angular/router';
import { ModeratorMarksSubmissionsComponent } from './marks-submissions/marks-submissions';
import { ContentProposals } from './content-proposals/content-proposals';
import { ContactRequests } from './contact-requests/contact-requests';
import { ManageReports } from './manage-reports/manage-reports';

export const moderatorRoutes: Routes = [
  {
    path: 'marks-submissions',
    children: [
      {
        path: '',
        component: ModeratorMarksSubmissionsComponent
      }
    ]
  },
  {
    path: 'content-proposals',
    children: [
      {
        path: '',
        component: ContentProposals
      }
    ]
  },
  {
    path: 'contact-requests',
    children: [
      {
        path: '',
        component: ContactRequests
      }
    ]
  },
  {
    path: 'manage-reports',
    children: [
      {
        path: '',
        component: ManageReports
      }
    ]
  }
];
