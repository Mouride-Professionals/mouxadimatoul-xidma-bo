import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidenceComponent } from './residence.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { residenceRoutes } from './residence.routing';
import { ChambreComponent } from './chambre/chambre.component';
import { PavillonComponent } from './pavillon/pavillon.component';
import { ReservationComponent } from './reservation/reservation.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    ResidenceComponent,
    ChambreComponent,
    PavillonComponent,
    ReservationComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,SharedModule, RouterModule.forChild(residenceRoutes)
  ]
})
export class ResidenceModule { }
