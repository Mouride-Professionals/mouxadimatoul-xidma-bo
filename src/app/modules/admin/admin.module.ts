import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './admin.routing';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { UtilisateurFormeComponent } from './utilisateur/utilisateur-forme/utilisateur-forme.component';

@NgModule({
    declarations: [AdminComponent, UtilisateurComponent, UtilisateurFormeComponent],
    imports: [SharedModule, RouterModule.forChild(adminRoutes)],
})
export class AdminModule {}
