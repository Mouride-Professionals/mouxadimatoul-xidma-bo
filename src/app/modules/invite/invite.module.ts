import { NgModule } from '@angular/core';
import { InviteComponent } from './invite.component';
import { RouterModule } from '@angular/router';
import { inviteRoutes } from './invite.routing';
import { SharedModule } from '@shared/shared.module';
import { FormInviteComponent } from './form-invite/form-invite.component';


@NgModule({
  declarations: [
    InviteComponent,
    FormInviteComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(inviteRoutes)
  ]
})
export class InviteModule { }
