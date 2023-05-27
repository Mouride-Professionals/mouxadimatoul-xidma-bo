import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { FuseAlertModule } from '@fuse/components/alert';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
];

@NgModule({
    declarations: [LoginComponent],
    imports: [SharedModule, FuseAlertModule, RouterModule.forChild(routes)],
})
export class LoginModule {}
