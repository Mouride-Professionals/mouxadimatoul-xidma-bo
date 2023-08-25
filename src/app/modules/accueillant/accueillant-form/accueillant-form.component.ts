import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Accueillant } from '@core/model/accueillant.model';
import { Residence } from '@core/model/residence.model';
import { AccueillantService } from '@core/service/accueillant/accueillant.service';
import { ResidenceService } from '@core/service/residence/residence.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-accueillant-form',
    templateUrl: './accueillant-form.component.html',
    styleUrls: ['./accueillant-form.component.scss'],
})
export class AccueillantFormComponent implements OnInit {
    accueillantForm: FormGroup = new FormGroup({
        utilisateur: new FormGroup({
            prenom: new FormControl('', Validators.required),
            nom: new FormControl('', Validators.required),
            telephone: new FormControl('', Validators.required),
        }),
        residence: new FormControl('', Validators.required),
    });
    accueillant: Accueillant;
    residences$: Observable<Residence[]>;
    isEdit = false;
    title: string = 'Ajouter un nouveau accueillant';

    constructor(
        private _accueillantService: AccueillantService,
        private _matDialogRef: MatDialogRef<AccueillantFormComponent>,
        private _residenceService: ResidenceService,
        @Inject(MAT_DIALOG_DATA) private data: Accueillant,
        private _snackBar: MatSnackBar
    ) {}

    get f(): any {
        return this.accueillantForm.controls;
    }

    ngOnInit(): void {
        this.residences$ = this._residenceService.getAllResidences();
        if (this.data) {
            this.isEdit = true;
            this.title = 'Modifier un accueillant';
            this.accueillantForm.patchValue(this.data);
        }
    }

    onSubmit(): void {
        if (this.accueillantForm.invalid) {
            return;
        }
        console.log(!this.isEdit);
        if (!this.isEdit) {
            this._accueillantService
                .save(this.accueillantForm.value)
                .subscribe(() => {
                    this._snackBar.open('Accueillant ajouté avec succés!', '', {
                        panelClass: ['bg-green-500', 'text-white'],
                        duration: 3000,
                    });
                    this._matDialogRef.close(true);
                });
        } else {
            const _data: Accueillant = {
                ...this.data,
                ...this.accueillantForm.value,
            };
            this._accueillantService.update(_data).subscribe(() => {
                this._snackBar.open('Accueillant modifié avec succés!', '', {
                    panelClass: ['bg-orange-500', 'text-white'],
                    duration: 3000,
                });
                this._matDialogRef.close(true);
            });
        }
    }

    compareResidence = (r1: Residence, r2: Residence): boolean =>
        r1 === r2 || r1.id === r2.id;
}
