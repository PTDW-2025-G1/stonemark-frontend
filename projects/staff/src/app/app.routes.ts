import { Routes } from '@angular/router';
import { AppLayout } from './layout/component/app.layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Notfound } from './pages/notfound/notfound';
import { ModeratorMarksSubmissionsComponent } from './pages/moderator/marks-submissions/marks-submissions';
import { ContentProposals } from './pages/moderator/content-proposals/content-proposals';
import { ManageModerators } from './pages/admin/manage-moderators/manage-moderators';
import { AuthGuard} from './guards/auth.guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        // canActivate: [AuthGuard],
        children: [
            { path: '', component: Dashboard },
            { path: 'moderator/marks-submissions', component: ModeratorMarksSubmissionsComponent },
            { path: 'moderator/content-proposals', component: ContentProposals },
            { path: 'admin/manage-moderators', component: ManageModerators },
            { path: 'uikit', loadChildren: () => import('../app/pages/uikit/uikit.routes') },
            { path: 'pages', loadChildren: () => import('../app/pages/pages.routes') }
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];
