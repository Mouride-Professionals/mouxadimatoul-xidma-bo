import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CardCountComponent } from './card-count/card-count.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    },
];

@NgModule({
    declarations: [DashboardComponent, CardCountComponent],
    imports: [SharedModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
