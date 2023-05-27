import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidenceComponent } from './residence.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { residenceRoutes } from './residence.routing';
import { ChambreComponent } from './chambre/chambre.component';



@NgModule({
  declarations: [
    ResidenceComponent,
    ChambreComponent,
  ],
  imports: [
    CommonModule,SharedModule, RouterModule.forChild(residenceRoutes)
  ]
})
export class ResidenceModule { }
