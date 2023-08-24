import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';

export const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: UtilisateurComponent,
            },
        ],
    },
];
