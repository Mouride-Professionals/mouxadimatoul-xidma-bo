import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'dashbord' },

    {
        path: '',
        component: LayoutComponent,
        resolve: { initialData: InitialDataResolver },
        children: [
            {
                path: 'dashbord',
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
                path: 'evenements',
                loadChildren: () =>
                    import('./modules/evenement/evenement.module').then((m) => m.EvenementModule),
            },
            {
                path: 'invites',
                loadChildren: () =>
                    import('./modules/invite/invite.module').then((m) => m.InviteModule),
            },
           /**  {
                path: 'dons',
                loadChildren: () =>
                    import('./modules/don/don.module').then((m) => m.DonModule),
            },*/
        ],
    },
];
