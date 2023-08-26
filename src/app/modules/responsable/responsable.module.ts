import { NgModule } from '@angular/core';
import { ResponsableComponent } from './responsable.component';
import { ResponsableListComponent } from './responsable-list/responsable-list.component';
import { ResponsableFormComponent } from './responsable-form/responsable-form.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ResponsableComponent,
        children: [
            {
                path: '',
                component: ResponsableListComponent,
            },
        ],
    },
];

@NgModule({
    declarations: [
        ResponsableComponent,
        ResponsableListComponent,
        ResponsableFormComponent,
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
})
export class ResponsableModule {}
