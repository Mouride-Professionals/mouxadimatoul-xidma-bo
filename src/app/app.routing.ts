import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from '@core/auth/guards/auth.guard';
import { NoAuthGuard } from '@core/auth/guards/noAuth.guard';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'connexion',
                loadChildren: () =>
                    import('@modules/auth/login/login.module').then(
                        (m) => m.LoginModule
                    ),
            },
        ],
    },

    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        resolve: { initialData: InitialDataResolver },
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./modules/dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
            },
            {
                path: 'utilisateurs',
                loadChildren: () =>
                    import('./modules/admin/admin.module').then(
                        (m) => m.AdminModule
                    ),
            },
            {
                path: 'residences',
                loadChildren: () =>
                    import('./modules/residence/residence.module').then(
                        (m) => m.ResidenceModule
                    ),
            },
            {
                path: 'dons',
                loadChildren: () =>
                    import('./modules/don/don.module').then((m) => m.DonModule),
            },
        ],
    },
];
