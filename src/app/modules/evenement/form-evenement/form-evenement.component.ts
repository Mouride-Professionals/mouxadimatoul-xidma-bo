import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Evenement } from '@core/model/evenement.model';
import { EvenementService } from '@core/service/evenement/evenement.service';

@Component({
    selector: 'app-form-evenement',
    templateUrl: './form-evenement.component.html',
    styleUrls: ['./form-evenement.component.scss'],
})
export class FormEvenementComponent implements OnInit {
    formFieldHelpers: string[] = [''];
    form: FormGroup;
    evenement: Evenement;
    isEdit = false;
    titleKey: string = 'events.form.addTitle';

    constructor(
        private _matDialogRef: MatDialogRef<FormEvenementComponent>,
        private _eventService: EvenementService,
        @Inject(MAT_DIALOG_DATA) private data: Evenement
    ) {}

    public get formEvent(): any {
        return this.form.controls;
    }

    ngOnInit(): void {
        this.eventForm();
        if (this.data) {
            this.isEdit = true;
            this.titleKey = 'events.form.editTitle';
        }
    }

    eventForm(): void {
        this.form = new FormGroup({
            libelle: new FormControl(this.data?.libelle, Validators.required),
            dateDebut: new FormControl(this.data?.dateDebut ?? null),
            dateFin: new FormControl(this.data?.dateFin ?? null),
        });
    }

    saveEvent(): void {
        if (this.form.invalid) {
            return;
        }
        if (!this.isEdit) {
            this._eventService
                .createEvent(this.form.value)
                .subscribe((res: Evenement) => {
                    this._matDialogRef.close(true);
                });
        } else {
            const _data: Evenement = {
                ...this.data,
                ...this.form.value,
            };
            this._eventService
                .updateEvent(_data)
                .subscribe((res: Evenement) => {
                    this._matDialogRef.close(true);
                });
        }
    }
}
