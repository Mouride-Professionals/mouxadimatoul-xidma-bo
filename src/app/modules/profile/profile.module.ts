import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '@shared/shared.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { profileRoutes } from '@modules/profile/profile.routing';
import { FuseAlertModule } from '@fuse/components/alert';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        SharedModule,
        MatButtonToggleModule,
        RouterModule.forChild(profileRoutes),
        FuseAlertModule,
    ],
})
export class ProfileModule {}
