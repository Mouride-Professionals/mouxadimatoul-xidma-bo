import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilisateurService} from '@core/service/utilisateur.service';
import {Utilisateur} from '@core/model/utilisateur.model';
import {RoleService} from '@core/service/role.service';
import {Role} from '@core/model/role.model';
import {Observable} from 'rxjs';
import {MAT_DIALOG_DATA, matDialogAnimations} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-utilisateur-forme',
  templateUrl: './utilisateur-forme.component.html',
  styleUrls: ['./utilisateur-forme.component.scss']
})
export class UtilisateurFormeComponent implements OnInit{
    formFieldHelpers: string[] = [''];
    form: FormGroup;
    user: Utilisateur;
    roles$: Observable<Role[]>;
    isEdit = false;
    tite: string = 'Ajouter un nouveau utilisateur';
    constructor(
        private _utilisateurService: UtilisateurService,
        private _roleService: RoleService,
        @Inject(MAT_DIALOG_DATA) private data: Utilisateur,
        private _snackBar: MatSnackBar
    ) {
    }
    ngOnInit(): void {
        this.userForm();
        this.getRoles();
        if (this.data) {
            this.isEdit = true;
            this.tite = 'Modifier un utilisateur';
        }
        console.log("data", this.data, this.isEdit);
    }
    // Convenience getter for easy access to form fields
    get formUser() { return this.form.controls; }
    userForm(): void {
        this.form = new FormGroup({
            prenom: new FormControl(this.data?.prenom, Validators.required),
            nom: new FormControl(this.data?.nom, Validators.required),
            telephone: new FormControl(this.data?.telephone, Validators.required),
            role: new FormControl(this.data?.role, Validators.required),
        });
    }

    saveUser(): void {
        if (this.form.invalid) {
            return;
        }
        console.log(!this.isEdit);
        if (!this.isEdit) {
            this._utilisateurService.createUser(this.form.value).subscribe((res: Utilisateur) => {
                this.openSnackBar('Utilisateur ajouté avec succés!', 'fermer');
                this.form.reset();
                window.location.reload();
            });
        } else  {
            const _data: Utilisateur = {
                ...this.data,
                ...this.form.value
            };
            this._utilisateurService.updateUser(_data).subscribe((res: Utilisateur) => {
                console.log('res', res);
            });
        }

    }
    // Get all Roles
    getRoles(): void {
        this.roles$ = this._roleService.getAllRoles();
    }
    openSnackBar(message: string, action: string): void {
        this._snackBar.open(message, action);
    }
}
