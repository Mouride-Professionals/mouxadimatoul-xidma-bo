import { NgModule } from '@angular/core';
import { ReservationsComponent } from './reservations.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { reservationRoutes } from './reservations.routing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationEditComponent } from './reservation-edit/reservation-edit.component';
import { ReservationDelegationDialogComponent } from './reservation-delegation-dialog/reservation-delegation-dialog.component';

@NgModule({
    declarations: [
        ReservationsComponent,
        ReservationListComponent,
        ReservationFormComponent,
        ReservationEditComponent,
        ReservationDelegationDialogComponent,
    ],
    imports: [
        SharedModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        RouterModule.forChild(reservationRoutes),
    ],
})
export class ReservationsModule {}
