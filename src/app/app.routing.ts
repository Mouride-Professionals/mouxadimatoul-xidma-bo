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
                    import('./modules/residences/residences.module').then(
                        (m) => m.ResidencesModule
                    ),
            },
            {
                path: 'evenements',
                loadChildren: () =>
                    import('./modules/evenement/evenement.module').then(
                        (m) => m.EvenementModule
                    ),
            },
            {
                path: 'reservations',
                loadChildren: () =>
                    import('./modules/reservations/reservations.module').then(
                        (m) => m.ReservationsModule
                    ),
            },
            {
                path: 'delegations',
                loadChildren: () =>
                    import('./modules/delegation/delegation.module').then(
                        (m) => m.DelegationModule
                    ),
            },
            {
                path: 'responsables',
                loadChildren: () =>
                    import('./modules/responsable/responsable.module').then(
                        (m) => m.ResponsableModule
                    ),
            },
            {
                path: 'accueillants',
                loadChildren: () =>
                    import('./modules/accueillant/accueillant.module').then(
                        (m) => m.AccueillantModule
                    ),
            },
            {
                path: 'profiles',
                loadChildren: () =>
                    import('./modules/profile/profile.module').then(
                        (m) => m.ProfileModule
                    ),
            },
        ],
    },
];
