import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chambre } from '@core/model/chambre.model';
import { Pavillon } from '@core/model/pavillon.model';
import { ChambreService } from '@core/service/chambre/chambre.service';

@Component({
    selector: 'app-residences-chambre-form',
    templateUrl: './residences-chambre-form.component.html',
    styleUrls: ['./residences-chambre-form.component.scss'],
})
export class ResidencesChambreFormComponent implements OnInit {
    chambreForm: FormGroup = new FormGroup({
        nombrePlace: new FormControl('', [
            Validators.required,
            Validators.min(1),
        ]),
        numero: new FormControl('', [Validators.required]),
        pavillon: new FormControl(null, [Validators.required]),
    });
    chambre: Chambre;
    pavillons: Pavillon[] = [];

    title: string = 'Ajouter une nouvelle chambre';
    isEdit = false;

    constructor(
        private _matDialogRef: MatDialogRef<ResidencesChambreFormComponent>,
        private _chambreService: ChambreService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA)
        private _data: { chambre?: Chambre; pavillons: Pavillon[] }
    ) {}

    get f(): any {
        return this.chambreForm.controls;
    }

    ngOnInit(): void {
        this.pavillons = this._data.pavillons;
        if (this._data.chambre) {
            this.chambre = this._data.chambre;
            this.isEdit = true;
            this.title = 'Modifier la chambre';
            this.chambreForm.patchValue(this.chambre);
            this.f.pavillon.disable();
        }
    }

    onSubmit(): void {
        if (this.chambreForm.invalid) {
            return;
        }
        this.chambreForm.disable();
        this.chambre = {
            ...this.chambre,
            ...this.chambreForm.value,
        };
        if (this.isEdit) {
            this._chambreService.updateChambre(this.chambre).subscribe({
                next: (c: Chambre) => {
                    this._snackBar.open('La chambre a été bien modifié', '', {
                        panelClass: ['bg-green-500', 'text-white'],
                        duration: 3000,
                    });
                    this._matDialogRef.close(true);
                },
                error: (err: any) => {
                    this.chambreForm.enable();
                    console.error(err);
                },
            });
        } else {
            this._chambreService.createChambre(this.chambre).subscribe({
                next: (c: Chambre) => {
                    this._snackBar.open('La chambre a été bien créée', '', {
                        panelClass: ['bg-green-500', 'text-white'],
                        duration: 3000,
                    });
                    this._matDialogRef.close(true);
                },
                error: (err: any) => {
                    this.chambreForm.enable();
                    console.error(err);
                },
            });
        }
    }

    onReset(): void {
        this.chambreForm.reset();
        this._matDialogRef.close();
    }

    onComparePavillon = (p1: Pavillon, p2: Pavillon): boolean =>
        p1 === p2 || p1.id === p2.id;
}
