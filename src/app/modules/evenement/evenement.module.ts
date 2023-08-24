import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvenementComponent } from './evenement.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { evenementRoutes } from './evenement.routing';
import { FormEvenementComponent } from './form-evenement/form-evenement.component';


@NgModule({
  declarations: [
    EvenementComponent,
    FormEvenementComponent
  ],
  imports: [
    CommonModule,SharedModule, RouterModule.forChild(evenementRoutes)
  ]
})
export class EvenementModule { }
