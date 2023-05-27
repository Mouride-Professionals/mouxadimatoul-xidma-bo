import { Routes } from '@angular/router';
import { ResidenceComponent } from './residence.component';
import { ChambreComponent } from './chambre/chambre.component';

export const residenceRoutes: Routes = [
    {
        path: '',
        component: ResidenceComponent,
        children: [
            {
                path: "chambre",
                component: ChambreComponent
            },
        ]
        
    },
];
