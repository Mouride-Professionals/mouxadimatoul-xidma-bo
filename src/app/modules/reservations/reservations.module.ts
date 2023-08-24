import { NgModule } from '@angular/core';
import { ReservationsComponent } from './reservations.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { reservationRoutes } from './reservations.routing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';

@NgModule({
    declarations: [
        ReservationsComponent,
        ReservationListComponent,
        ReservationFormComponent,
    ],
    imports: [
        SharedModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        RouterModule.forChild(reservationRoutes),
    ],
})
export class ReservationsModule {}
