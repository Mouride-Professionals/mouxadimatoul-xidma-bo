import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UtilisateurFormeComponent} from "@modules/admin/utilisateur/utilisateur-forme/utilisateur-forme.component";

@Component({
    selector: 'app-utilisateur',
    templateUrl: './utilisateur.component.html',
    styleUrls: ['./utilisateur.component.scss'],
})
export class UtilisateurComponent {
    search: string = '';

    constructor(private _matDialog: MatDialog) {
    }
    onSearch(): void {}

    addNewUser(): void {
        this._matDialog.open(UtilisateurFormeComponent, {
            autoFocus: false,
            panelClass: 'w-full',
            data     : {
                user: {}
            }
        });
    }
}
