import { Routes } from '@angular/router';
import { AppLayout } from './layout/component/app.layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Notfound } from './pages/notfound/notfound';
import {roleGuard} from '@core/guards/role.guard';
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
        ],
    },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];
