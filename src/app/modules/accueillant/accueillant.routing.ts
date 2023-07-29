import { Routes } from '@angular/router';
import { AccueillantComponent } from './accueillant.component';
import { AccueillantListComponent } from './accueillant-list/accueillant-list.component';

export const accueillantRoutes: Routes = [
    {
        path: '',
        component: AccueillantComponent,
        children: [
            {
                path: '',
                component: AccueillantListComponent,
            },
        ],
    },
];
