import { Routes } from '@angular/router';
import { ResidencesComponent } from './residences.component';
import { ResidencesListComponent } from './residences-list/residences-list.component';
import { ResidencesFormComponent } from './residences-form/residences-form.component';
import { ResidencesDetailsComponent } from './residences-details/residences-details.component';

export const residenceRoutes: Routes = [
    {
        path: '',
        component: ResidencesComponent,
        children: [
            {
                path: '',
                component: ResidencesListComponent,
            },
            {
                path: 'nouveau',
                component: ResidencesFormComponent,
            },
            {
                path: ':id',
                component: ResidencesDetailsComponent,
            },
        ],
    },
];
