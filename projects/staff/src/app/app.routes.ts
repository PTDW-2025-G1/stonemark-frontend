import { Routes } from '@angular/router';
import { AppLayout } from './layout/component/app.layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Notfound } from './pages/notfound/notfound';
import {roleGuard} from 'projects/shared/src/lib/core/guards/role.guard'; // Corrected import path
import {adminRoutes} from './pages/admin/admin.routes';
import {moderatorRoutes} from './pages/moderator/moderator.routes';
import {LogoutComponent} from './pages/logout/logout';

export const appRoutes: Routes = [
    {
        path: '',
        canActivate: [roleGuard],
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'moderator', children: moderatorRoutes },
            { path: 'admin', children: adminRoutes },
            { path: 'logout', component: LogoutComponent },
            { path: 'uikit', loadChildren: () => import('../app/pages/uikit/uikit.routes') },
            { path: 'pages', loadChildren: () => import('../app/pages/pages.routes') }
        ],
    },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];
