import { Routes } from '@angular/router';
import { DelegationComponent } from './delegation.component';
import { DelegationListComponent } from './delegation-list/delegation-list.component';
import { DelegationFormComponent } from './delegation-form/delegation-form.component';
import { DelegationDetailsComponent } from './delegation-details/delegation-details.component';

export const delegationRoutes: Routes = [
    {
        path: '',
        component: DelegationComponent,
        children: [
            {
                path: '',
                component: DelegationListComponent,
            },
            {
                path: 'ajouter',
                component: DelegationFormComponent,
            },
            // {
            //     path: 'modifier/:id',
            //     component: DelegationFormComponent,
            // },
            // {
            //     path: ':id',
            //     component: DelegationDetailsComponent,
            // },
        ],
    },
];
