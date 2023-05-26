import { NgModule } from '@angular/core';
import { DonComponent } from './don.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { donRoutes } from './don.routing';

@NgModule({
    declarations: [DonComponent],
    imports: [SharedModule, RouterModule.forChild(donRoutes)],
})
export class DonModule {}
