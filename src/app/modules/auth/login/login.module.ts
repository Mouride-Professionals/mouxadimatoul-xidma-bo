import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { FuseAlertModule } from '@fuse/components/alert';
import { LanguageSelectorModule } from 'app/layout/common/language-selector/language-selector.module';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
];

@NgModule({
    declarations: [LoginComponent],
    imports: [
        SharedModule,
        FuseAlertModule,
        LanguageSelectorModule,
        RouterModule.forChild(routes),
    ],
})
export class LoginModule {}
