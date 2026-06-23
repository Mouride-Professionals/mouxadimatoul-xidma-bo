import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Residence } from '@core/model/residence.model';
import { Responsable } from '@core/model/responsable.model';
import { ResidenceService } from '@core/service/residence/residence.service';
import { ResponsableService } from '@core/service/responsable/responsable.service';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-responsable-form',
    templateUrl: './responsable-form.component.html',
    styleUrls: ['./responsable-form.component.scss'],
})
export class ResponsableFormComponent implements OnInit {
    responsableForm: FormGroup = new FormGroup({
        prenom: new FormControl('', Validators.required),
        nom: new FormControl('', Validators.required),
        telephone: new FormControl('', Validators.required),
        residence: new FormControl('', Validators.required),
    });
    responsable: Responsable;
    residences$: Observable<Residence[]>;
    isEdit = false;
    titleKey: string = 'roomManagers.form.addTitle';

    constructor(
        private _responsableService: ResponsableService,
        private _matDialogRef: MatDialogRef<ResponsableFormComponent>,
        private _residenceService: ResidenceService,
        @Inject(MAT_DIALOG_DATA) private data: Responsable,
        private _snackBar: MatSnackBar,
        private _translocoService: TranslocoService
    ) {}

    get f(): any {
        return this.responsableForm.controls;
    }

    ngOnInit(): void {
        this.residences$ = this._residenceService.getAllResidences();
        if (this._residenceService.residence) {
            this.responsableForm
                .get('residence')
                .setValue(this._residenceService.residence);
            this.responsableForm.get('residence').disable();
        }
        if (this.data) {
            this.isEdit = true;
            this.titleKey = 'roomManagers.form.editTitle';
            this.responsableForm.patchValue(this.data);
        }
    }

    onSubmit(): void {
        if (this.responsableForm.invalid) {
            return;
        }
        this.responsableForm.get('residence').enable();
        const _data: Responsable = {
            ...this.data,
            ...this.responsableForm.value,
        };
        this._responsableService.save(_data).subscribe(() => {
            this._snackBar.open(
                this._translocoService.translate(
                    'roomManagers.messages.updated'
                ),
                '',
                {
                    panelClass: ['bg-orange-500', 'text-white'],
                    duration: 3000,
                }
            );
            this._matDialogRef.close(true);
        });
    }

    compareResidence = (r1: Residence, r2: Residence): boolean =>
        r1 === r2 || r1.id === r2.id;
}
