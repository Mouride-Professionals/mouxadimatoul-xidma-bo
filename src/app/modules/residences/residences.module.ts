import { NgModule } from '@angular/core';
import { ResidencesComponent } from './residences.component';
import { ResidencesListComponent } from './residences-list/residences-list.component';
import { ResidencesFormComponent } from './residences-form/residences-form.component';
import { ResidencesDetailsComponent } from './residences-details/residences-details.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { residenceRoutes } from './residences.routing';
import { ResidencesPavillonAddComponent } from './residences-pavillon-add/residences-pavillon-add.component';
import { ResidencesChambreFormComponent } from './residences-chambre-form/residences-chambre-form.component';
import { ResidencesEditComponent } from './residences-edit/residences-edit.component';
import { ResidencesEditImageComponent } from './residences-edit-image/residences-edit-image.component';

@NgModule({
    declarations: [
        ResidencesComponent,
        ResidencesListComponent,
        ResidencesFormComponent,
        ResidencesDetailsComponent,
        ResidencesPavillonAddComponent,
        ResidencesChambreFormComponent,
        ResidencesEditComponent,
        ResidencesEditImageComponent,
    ],
    imports: [SharedModule, RouterModule.forChild(residenceRoutes)],
})
export class ResidencesModule {}
