import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UtilisateurService } from '@core/service/utilisateur/utilisateur.service';
import { Utilisateur } from '@core/model/utilisateur.model';
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
    const pw = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pw && confirm && pw !== confirm ? { passwordsMustMatch: true } : null;
}
@Component({
    selector: 'app-utilisateur-forme',
    templateUrl: './utilisateur-forme.component.html',
    styleUrls: ['./utilisateur-forme.component.scss'],
})
export class UtilisateurFormeComponent implements OnInit {
    form: FormGroup;
    user: Utilisateur;
    // roles$: Observable<Role[]>;
    isEdit = false;
    titleKey: string = 'users.form.addTitle';

    constructor(
        private _utilisateurService: UtilisateurService,
        private _matDialogRef: MatDialogRef<UtilisateurFormeComponent>,
        // private _roleService: RoleService,
        @Inject(MAT_DIALOG_DATA) private data: Utilisateur,
        private _snackBar: MatSnackBar,
        private _translocoService: TranslocoService
    ) {}

    // Convenience getter for easy access to form fields
    get formUser(): any {
        return this.form.controls;
    }

    ngOnInit(): void {
        this.userForm();
        // this.getRoles();
        if (this.data) {
            this.isEdit = true;
            this.titleKey = 'users.form.editTitle';
        }
        console.log('data', this.data, this.isEdit);
    }

    userForm(): void {
        this.form = new FormGroup(
            {
                prenom: new FormControl(this.data?.prenom, Validators.required),
                nom: new FormControl(this.data?.nom, Validators.required),
                telephone: new FormControl(
                    this.data?.telephone,
                    Validators.required
                ),
                whatsapp: new FormControl(this.data?.whatsapp ?? null),
                accountType: new FormControl(
                    this.data?.accountType ?? 'KHIDMA_AGENT',
                    Validators.required
                ),
                password: new FormControl(
                    null,
                    this.isEdit ? [Validators.minLength(6)] : [Validators.required, Validators.minLength(6)]
                ),
                confirmPassword: new FormControl(
                    null,
                    this.isEdit ? [] : [Validators.required]
                ),
            },
            { validators: passwordsMatch }
        );
    }

    saveUser(): void {
        if (this.form.invalid) {
            return;
        }
        console.log(!this.isEdit);
        if (!this.isEdit) {
            const { confirmPassword, ...payload } = this.form.value;
            this._utilisateurService
                .createUser(payload)
                .subscribe((res: Utilisateur) => {
                    this._snackBar.open(
                        this._translocoService.translate(
                            'users.messages.created'
                        ),
                        '',
                        {
                            panelClass: ['bg-green-500', 'text-white'],
                            duration: 3000,
                        }
                    );
                    this.form.reset();
                    this._matDialogRef.close(true);
                });
        } else {
            const pw: string = this.form.value.password;
            if (pw) {
                this._utilisateurService
                    .changePassword(this.data.id, pw)
                    .subscribe(() => {
                        this._snackBar.open(
                            this._translocoService.translate('users.messages.passwordChanged'),
                            '',
                            { panelClass: ['bg-green-500', 'text-white'], duration: 3000 }
                        );
                        this._matDialogRef.close(false);
                    });
            } else {
                this._matDialogRef.close(false);
            }
        }
    }
    // Get all Roles
    // getRoles(): void {
    //     this.roles$ = this._roleService
    //         .getAllRoles()
    //         .pipe(
    //             map((roles: Role[]) =>
    //                 roles.filter((role: Role) => role.libelle !== 'accueillant')
    //             )
    //         );
    // }
}
