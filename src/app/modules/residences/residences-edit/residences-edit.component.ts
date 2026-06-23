import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Residence } from '@core/model/residence.model';
import { Utilisateur } from '@core/model/utilisateur.model';
import { ResidenceService } from '@core/service/residence/residence.service';
import { UtilisateurService } from '@core/service/utilisateur/utilisateur.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'app-residences-edit',
    templateUrl: './residences-edit.component.html',
    styleUrls: ['./residences-edit.component.scss'],
})
export class ResidencesEditComponent implements OnInit {
    residenceForm: FormGroup = new FormGroup({
        libelle: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        adresse: new FormControl('', Validators.required),
        telephoneResidence: new FormControl('', Validators.required),
        responsable: new FormControl('', Validators.required),
    });
    users: Utilisateur[] = [];

    constructor(
        private _matDialogRef: MatDialogRef<ResidencesEditComponent>,
        private _residenceService: ResidenceService,
        private _userService: UtilisateurService,
        private _snackBar: MatSnackBar,
        private _translocoService: TranslocoService,
        @Inject(MAT_DIALOG_DATA) private residence: Residence
    ) {}

    get f(): any {
        return this.residenceForm.controls;
    }

    ngOnInit(): void {
        this._userService
            .getAllUsers({ page: 0, size: 100 }, 'responsable')
            .subscribe((data) => {
                if (!data.empty) {
                    this.users = data.content;
                }
            });
        if (this.residence) {
            this.residenceForm.patchValue(this.residence);
        }
    }

    onSubmit(): void {
        if (this.residenceForm.invalid) {
            return;
        }
        this.residence = {
            ...this.residence,
            ...this.residenceForm.value,
        };
        this.residenceForm.disable();
        this._residenceService.updateResidence(this.residence).subscribe({
            next: (res: Residence) => {
                this._snackBar.open(
                    this._translocoService.translate(
                        'residences.messages.updated'
                    ),
                    '',
                    {
                        panelClass: ['bg-green-500', 'text-white'],
                        duration: 3000,
                    }
                );
                this._matDialogRef.close(res);
            },
            error: (err: any) => {
                this.residenceForm.enable();
                console.error(err);
            },
        });
    }

    onReset(): void {
        this.residenceForm.reset();
        this._matDialogRef.close();
    }

    onCompareUser = (u1: Utilisateur, u2: Utilisateur): boolean =>
        u1 === u2 || u1.id === u2.id;
}
