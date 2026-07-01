import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chambre } from '@core/model/chambre.model';
import { Pavillon } from '@core/model/pavillon.model';
import { ChambreService } from '@core/service/chambre/chambre.service';
import { TranslocoService } from '@ngneat/transloco';

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
        niveau: new FormControl(null, Validators.required),
        numero: new FormControl('', [Validators.required]),
        pavillon: new FormControl(null, [Validators.required]),
    });
    chambre: Chambre;
    pavillons: Pavillon[] = [];
    paliers: number[] = [];

    titleKey: string = 'residences.rooms.form.addTitle';
    isEdit = false;
    private _anySaved = false;

    constructor(
        private _matDialogRef: MatDialogRef<ResidencesChambreFormComponent>,
        private _chambreService: ChambreService,
        private _snackBar: MatSnackBar,
        private _translocoService: TranslocoService,
        @Inject(MAT_DIALOG_DATA)
        private _data: { chambre?: Chambre; pavillons: Pavillon[]; selectedPavillon?: Pavillon }
    ) {}

    get f(): any {
        return this.chambreForm.controls;
    }

    ngOnInit(): void {
        this.pavillons = this._data.pavillons;
        if (this._data.chambre) {
            this.chambre = this._data.chambre;
            this.isEdit = true;
            this.titleKey = 'residences.rooms.form.editTitle';
            this.chambreForm.patchValue(this.chambre);
            this.f.pavillon.disable();
        } else if (this._data.selectedPavillon) {
            this.chambreForm.patchValue({ pavillon: this._data.selectedPavillon });
            this.onSelectPavillon();
        }
    }

    getFloorLabel(floor: number): string {
        if (floor === 0) {
            return this._translocoService.translate(
                'residences.rooms.groundFloor'
            );
        }
        return this._translocoService.translate('residences.rooms.floorNumber', {
            floor,
        });
    }

    onSelectPavillon(): void {
        const pav = this.chambreForm.get('pavillon').value as Pavillon;
        this.paliers = [];
        if (!pav) {
            return;
        }
        this.paliers = Array.from({ length: pav.niveau }, (x, i) => i);
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
                    this._snackBar.open(
                        this._translocoService.translate(
                            'residences.rooms.messages.updated'
                        ),
                        '',
                        {
                            panelClass: ['bg-green-500', 'text-white'],
                            duration: 3000,
                        }
                    );
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
                    this._snackBar.open(
                        this._translocoService.translate(
                            'residences.rooms.messages.created'
                        ),
                        '',
                        {
                            panelClass: ['bg-green-500', 'text-white'],
                            duration: 3000,
                        }
                    );
                    this._matDialogRef.close(true);
                },
                error: (err: any) => {
                    this.chambreForm.enable();
                    console.error(err);
                },
            });
        }
    }

    onSubmitAndAddAnother(): void {
        if (this.chambreForm.invalid) {
            return;
        }
        this.chambreForm.disable();
        const chambre = { ...this.chambreForm.value };
        this._chambreService.createChambre(chambre).subscribe({
            next: () => {
                this._snackBar.open(
                    this._translocoService.translate(
                        'residences.rooms.messages.created'
                    ),
                    '',
                    { panelClass: ['bg-green-500', 'text-white'], duration: 3000 }
                );
                const pavillon = this.chambreForm.get('pavillon').value;
                const niveau = this.chambreForm.get('niveau').value;
                const nombrePlace = this.chambreForm.get('nombrePlace').value;
                this._anySaved = true;
                this.chambreForm.enable();
                this.chambreForm.reset({ pavillon, niveau, nombrePlace });
            },
            error: (err: any) => {
                this.chambreForm.enable();
                console.error(err);
            },
        });
    }

    onReset(): void {
        this.chambreForm.reset();
        this._matDialogRef.close(this._anySaved);
    }

    onComparePavillon = (p1: Pavillon, p2: Pavillon): boolean =>
        p1 === p2 || p1.id === p2.id;
}
