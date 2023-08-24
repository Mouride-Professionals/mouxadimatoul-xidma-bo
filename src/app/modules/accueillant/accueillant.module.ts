import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueillantComponent } from './accueillant.component';
import { AccueillantFormComponent } from './accueillant-form/accueillant-form.component';
import { AccueillantListComponent } from './accueillant-list/accueillant-list.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { accueillantRoutes } from './accueillant.routing';

@NgModule({
    declarations: [
        AccueillantComponent,
        AccueillantFormComponent,
        AccueillantListComponent,
    ],
    imports: [SharedModule, RouterModule.forChild(accueillantRoutes)],
})
export class AccueillantModule {}
