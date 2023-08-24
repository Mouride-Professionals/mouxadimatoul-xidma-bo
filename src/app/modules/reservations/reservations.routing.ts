import { Routes } from '@angular/router';
import { ReservationsComponent } from './reservations.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationEditComponent } from './reservation-edit/reservation-edit.component';

export const reservationRoutes: Routes = [
    {
        path: '',
        component: ReservationsComponent,
        children: [
            {
                path: '',
                component: ReservationListComponent,
            },
            {
                path: ':id/modifier',
                component: ReservationEditComponent,
            },
            {
                path: 'reserver',
                component: ReservationFormComponent,
            },
        ],
    },
];
