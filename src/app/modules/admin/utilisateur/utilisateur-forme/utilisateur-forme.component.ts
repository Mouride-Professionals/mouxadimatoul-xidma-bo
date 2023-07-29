import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from '@core/service/utilisateur/utilisateur.service';
import { Utilisateur } from '@core/model/utilisateur.model';
import { RoleService } from '@core/service/role/role.service';
import { Role } from '@core/model/role.model';
import { Observable } from 'rxjs';
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    matDialogAnimations,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
    selector: 'app-utilisateur-forme',
    templateUrl: './utilisateur-forme.component.html',
    styleUrls: ['./utilisateur-forme.component.scss'],
})
export class UtilisateurFormeComponent implements OnInit {
    form: FormGroup;
    user: Utilisateur;
    roles$: Observable<Role[]>;
    isEdit = false;
    tite: string = 'Ajouter un nouveau utilisateur';

    constructor(
        private _utilisateurService: UtilisateurService,
        private _matDialogRef: MatDialogRef<UtilisateurFormeComponent>,
        private _roleService: RoleService,
        @Inject(MAT_DIALOG_DATA) private data: Utilisateur,
        private _snackBar: MatSnackBar
    ) {}

    // Convenience getter for easy access to form fields
    get formUser(): any {
        return this.form.controls;
    }

    ngOnInit(): void {
        this.userForm();
        this.getRoles();
        if (this.data) {
            this.isEdit = true;
            this.tite = 'Modifier un utilisateur';
        }
        console.log('data', this.data, this.isEdit);
    }

    userForm(): void {
        this.form = new FormGroup({
            prenom: new FormControl(this.data?.prenom, Validators.required),
            nom: new FormControl(this.data?.nom, Validators.required),
            telephone: new FormControl(
                this.data?.telephone,
                Validators.required
            ),
            role: new FormControl(this.data?.role, Validators.required),
        });
    }

    saveUser(): void {
        if (this.form.invalid) {
            return;
        }
        console.log(!this.isEdit);
        if (!this.isEdit) {
            this._utilisateurService
                .createUser(this.form.value)
                .subscribe((res: Utilisateur) => {
                    this._snackBar.open('Utilisateur ajouté avec succés!', '', {
                        panelClass: ['bg-green-500', 'text-white'],
                        duration: 3000,
                    });
                    this.form.reset();
                    this._matDialogRef.close(true);
                });
        } else {
            const _data: Utilisateur = {
                ...this.data,
                ...this.form.value,
            };
            this._utilisateurService
                .updateUser(_data)
                .subscribe((res: Utilisateur) => {
                    console.log('res', res);
                });
        }
    }
    // Get all Roles
    getRoles(): void {
        this.roles$ = this._roleService.getAllRoles();
    }
}
