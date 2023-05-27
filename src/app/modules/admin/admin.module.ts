import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './admin.routing';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';

@NgModule({
    declarations: [AdminComponent, UtilisateurComponent],
    imports: [SharedModule, RouterModule.forChild(adminRoutes)],
})
export class AdminModule {}
