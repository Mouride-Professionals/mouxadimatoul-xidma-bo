import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { translateApiError } from '@core/i18n/api-error-message';
import { Pavillon } from '@core/model/pavillon.model';
import { Residence } from '@core/model/residence.model';
import { PavillonService } from '@core/service/pavillon/pavillon.service';
import { TranslocoService } from '@ngneat/transloco';

export type PavillonDialogData = { residence: Residence; pavillon?: Pavillon };

@Component({
    selector: 'app-residences-pavillon-add',
    templateUrl: './residences-pavillon-add.component.html',
    styleUrls: ['./residences-pavillon-add.component.scss'],
})
export class ResidencesPavillonAddComponent implements OnInit {
    isEditMode = false;

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
        private _translocoService: TranslocoService,
        @Inject(MAT_DIALOG_DATA) public data: PavillonDialogData
    ) {}

    get f(): any {
        return this.pavillonForm.controls;
    }

    get chambres(): FormArray {
        return this.pavillonForm.controls['chambres'] as FormArray;
    }

    ngOnInit(): void {
        if (this.data.pavillon) {
            this.isEditMode = true;
            this.pavillonForm.patchValue({
                libelle: this.data.pavillon.libelle,
                niveau: this.data.pavillon.niveau,
            });
        }
    }

    onSubmit(): void {
        if (this.pavillonForm.invalid) {
            this.pavillonForm.markAllAsTouched();
            return;
        }
        this.pavillonForm.disable();
        const pavillon: Pavillon = {
            ...this.pavillonForm.value,
            residence: this.data.residence,
        };

        const request$ = this.isEditMode
            ? this._pavillonService.updatePavillon(this.data.pavillon.id, {
                  ...pavillon,
                  id: this.data.pavillon.id,
              })
            : this._pavillonService.createPavillon(pavillon);

        request$.subscribe({
            next: (pav: Pavillon) => {
                this._snackBar.open(
                    this._translocoService.translate(
                        this.isEditMode
                            ? 'residences.pavilions.messages.updated'
                            : 'residences.pavilions.messages.created'
                    ),
                    '',
                    { panelClass: ['bg-green-500', 'text-white'], duration: 3000 }
                );
                this._matDialogRef.close(pav);
            },
            error: (err: any) => {
                this.pavillonForm.enable();
                this._snackBar.open(
                    translateApiError(this._translocoService, err),
                    '',
                    { panelClass: ['bg-red-500', 'text-white'], duration: 4000 }
                );
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
