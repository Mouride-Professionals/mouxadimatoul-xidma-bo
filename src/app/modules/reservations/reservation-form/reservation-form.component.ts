import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Evenement } from '@core/model/evenement.model';
import { EvenementService } from '@core/service/evenement.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-reservation-form',
    templateUrl: './reservation-form.component.html',
    styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent implements OnInit {
    reservationForm: FormGroup = new FormGroup({
        date: new FormGroup({
            entree: new FormControl(null, [Validators.required]),
            sortie: new FormControl(null, [Validators.required]),
        }),
        evenement: new FormControl(null, [Validators.required]),
        invites: new FormArray(
            [],
            [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(6),
            ]
        ),
    });

    events$: Observable<Evenement[]>;

    constructor(private _eventService: EvenementService) {}

    get f(): any {
        return this.reservationForm.controls;
    }

    get invites(): FormArray {
        return this.reservationForm.get('invites') as FormArray;
    }

    ngOnInit(): void {
        this.events$ = this._eventService.getAllEvent();
        this.addGuest();
    }

    onSubmit(): void {
        if (this.reservationForm.invalid) {
            return;
        }
    }

    removeGuest(index: number): void {
        this.invites.removeAt(index);
    }

    addGuest(): void {
        this.invites.push(
            new FormGroup({
                prenom: new FormControl(null, [
                    Validators.required,
                    Validators.minLength(3),
                ]),
                nom: new FormControl(null, [
                    Validators.required,
                    Validators.minLength(2),
                ]),
                telephone: new FormControl(null, [
                    Validators.required,
                    Validators.minLength(9),
                ]),
                adresse: new FormControl(null),
                email: new FormControl(null, [Validators.email]),
            })
        );
    }
}
