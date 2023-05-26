import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },

    {
        path: '',
        component: LayoutComponent,
        resolve: { initialData: InitialDataResolver },
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('./modules/home/home.module').then(
                        (m) => m.HomeModule
                    ),
            },
        ],
    },
];
