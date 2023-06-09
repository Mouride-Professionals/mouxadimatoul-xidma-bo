import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pavillon } from '@core/model/pavillon.model';
import { Residence } from '@core/model/residence.model';
import { PavillonService } from '@core/service/pavillon/pavillon.service';

@Component({
    selector: 'app-residences-pavillon-add',
    templateUrl: './residences-pavillon-add.component.html',
    styleUrls: ['./residences-pavillon-add.component.scss'],
})
export class ResidencesPavillonAddComponent implements OnInit {
    pavillonForm: FormGroup = new FormGroup({
        libelle: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
        ]),
        niveau: new FormControl('', [Validators.required, Validators.min(0)]),
        chambres: new FormArray([]),
    });

    constructor(
        private _matDialogRef: MatDialogRef<ResidencesPavillonAddComponent>,
        private _pavillonService: PavillonService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) private residence: Residence
    ) {}

    get f(): any {
        return this.pavillonForm.controls;
    }

    get chambres(): FormArray {
        return this.pavillonForm.controls['chambres'] as FormArray;
    }

    ngOnInit(): void {}

    onSubmit(): void {
        if (this.pavillonForm.invalid) {
            return;
        }
        this.pavillonForm.disable();
        const pavillon: Pavillon = {
            ...this.pavillonForm.value,
            residence: this.residence,
        };
        this._pavillonService.createPavillon(pavillon).subscribe({
            next: (pav: Pavillon) => {
                this._snackBar.open('Pavillon créé avec success', '', {
                    panelClass: ['bg-green-500', 'text-white'],
                    duration: 3000,
                });
                this._matDialogRef.close(pav);
            },
            error: (err: any) => {
                this.pavillonForm.enable();
                console.error(err);
            },
        });
    }

    onAddChambre(): void {
        const chambreForm: FormGroup = new FormGroup({
            numero: new FormControl('', [Validators.required]),
            nombrePlace: new FormControl('', [
                Validators.required,
                Validators.min(0),
            ]),
        });
        this.chambres.push(chambreForm);
    }

    onDeleteChambreItem(index: number): void {
        this.chambres.removeAt(index);
    }

    onReset(): void {
        this.pavillonForm.reset();
        this._matDialogRef.close();
    }
}
