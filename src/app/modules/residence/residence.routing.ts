import { Routes } from '@angular/router';
import { ResidenceComponent } from './residence.component';
import { ChambreComponent } from './chambre/chambre.component';
import { PavillonComponent } from './pavillon/pavillon.component';
import { ReservationComponent } from './reservation/reservation.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const residenceRoutes: Routes = [
    {
        path: '',
        component: ResidenceComponent,
        children: [
            {
                path: "dashboard",
                component: DashboardComponent
            },
            {
                path: "chambre",
                component: ChambreComponent
            },
            {
                path: "pavillon",
                component: PavillonComponent
            },
            {
                path: "reservation",
                component: ReservationComponent
            },
        ]
        
    },
];
