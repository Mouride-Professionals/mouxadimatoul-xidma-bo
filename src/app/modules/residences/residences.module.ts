import { NgModule } from '@angular/core';
import { ResidencesComponent } from './residences.component';
import { ResidencesListComponent } from './residences-list/residences-list.component';
import { ResidencesFormComponent } from './residences-form/residences-form.component';
import { ResidencesDetailsComponent } from './residences-details/residences-details.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { residenceRoutes } from './residences.routing';

@NgModule({
    declarations: [
        ResidencesComponent,
        ResidencesListComponent,
        ResidencesFormComponent,
        ResidencesDetailsComponent,
    ],
    imports: [SharedModule, RouterModule.forChild(residenceRoutes)],
})
export class ResidencesModule {}
