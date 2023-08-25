import { NgModule } from '@angular/core';
import { DelegationComponent } from './delegation.component';
import { DelegationListComponent } from './delegation-list/delegation-list.component';
import { DelegationFormComponent } from './delegation-form/delegation-form.component';
import { DelegationDetailsComponent } from './delegation-details/delegation-details.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { delegationRoutes } from './delegation.routing';
import { DelegationAddInviteComponent } from './delegation-details/delegation-add-invite/delegation-add-invite.component';

@NgModule({
    declarations: [
        DelegationComponent,
        DelegationListComponent,
        DelegationFormComponent,
        DelegationDetailsComponent,
        DelegationAddInviteComponent,
    ],
    imports: [SharedModule, RouterModule.forChild(delegationRoutes)],
})
export class DelegationModule {}
