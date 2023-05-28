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
import { ListeResidenceComponent } from './liste-residence/liste-residence.component';
import { FormResidenceComponent } from './form-residence/form-residence.component';



@NgModule({
  declarations: [
    ResidenceComponent,
    ChambreComponent,
    PavillonComponent,
    ReservationComponent,
    DashboardComponent,
    ListeResidenceComponent,
    FormResidenceComponent,
  ],
  imports: [
    CommonModule,SharedModule, RouterModule.forChild(residenceRoutes)
  ]
})
export class ResidenceModule { }
