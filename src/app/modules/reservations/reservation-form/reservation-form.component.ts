import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Chambre } from '@core/model/chambre.model';
import { Delegation } from '@core/model/delegation.model';
import { Evenement } from '@core/model/evenement.model';
import { Residence } from '@core/model/residence.model';
import { ChambreService } from '@core/service/chambre/chambre.service';
import { DelegationService } from '@core/service/delegation/delegation.service';
import { EvenementService } from '@core/service/evenement/evenement.service';
import { ReservationService } from '@core/service/reservation/reservation.service';
import { ResidenceService } from '@core/service/residence/residence.service';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-reservation-form',
    templateUrl: './reservation-form.component.html',
    styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent implements OnInit {
    reservationForm: FormGroup = new FormGroup({
        period: new FormGroup(
            {
                entree: new FormControl(null, [Validators.required]),
                sortie: new FormControl(null, [Validators.required]),
            },
            [Validators.required]
        ),
        evenement: new FormControl(null, [Validators.required]),
        residence: new FormControl(null, [Validators.required]),
        delegation: new FormGroup({}),
        invites: new FormArray(
            [],
            [Validators.required, Validators.minLength(1)]
        ),
    });

    events$: Observable<Evenement[]>;
    delegations$: Observable<Delegation[]>;
    residences$: Observable<Residence[]>;
    chambres$: Observable<Chambre[]>;
    chambresIndisponibles: number[] = [];
    idIndispo: number[] = [];

    constructor(
        private _eventService: EvenementService,
        private _residenceService: ResidenceService,
        private _chambreService: ChambreService,
        private _reservationService: ReservationService,
        private _delagationService: DelegationService,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) {}

    get f(): any {
        return this.reservationForm.controls;
    }

    get invites(): FormArray {
        return this.reservationForm.get('invites') as FormArray;
    }

    ngOnInit(): void {
        this.delegations$ = this._delagationService
            .getAllDelagations({ page: 0, size: 1000 })
            .pipe(map((data) => data.content));
        this.events$ = this._eventService.getAllEvent();
        this.residences$ = this._residenceService.getAllResidences();
        this.addGuest();
    }

    onSubmit(): void {
        if (this.reservationForm.invalid) {
            return;
        }
        this._reservationService
            .addReservations(this.reservationForm.value)
            .subscribe({
                next: (res) => {
                    this._snackBar.open(
                        `${res.length} réservation${
                            res.length > 1 ? 's' : ''
                        } effectuée${res.length > 1 ? 's' : ''}`,
                        '',
                        {
                            panelClass: ['bg-green-600', 'text-white'],
                            duration: 3000,
                        }
                    );
                    this._router.navigate(['/reservations']);
                },
                error: (err) => {
                    console.log(err);
                    this._snackBar.open(err.error.message, '', {
                        panelClass: ['bg-red-600', 'text-white'],
                        duration: 3500,
                    });
                },
            });
    }

    onChoiceChambre(chambre: Chambre): void {
        if (chambre) {
            const chambreSelected: number[] = this.invites.value.map(
                (i: any) => i.chambre.id
            );
            const idSelected: { [key: number]: number } =
                chambreSelected.reduce(
                    (count, currentValue) => (
                        count[currentValue]
                            ? ++count[currentValue]
                            : (count[currentValue] = 1),
                        count
                    ),
                    {}
                );
            if (
                chambre.nombrePlace - chambre.placeReservee <=
                idSelected[chambre.id]
            ) {
                this.idIndispo.push(chambre.id);
            } else {
                const index = this.idIndispo.indexOf(chambre.id);
                this.idIndispo = this.idIndispo.splice(index, 1);
            }
        }
    }

    isUnvalaible(id: number): boolean {
        return this.idIndispo.includes(id);
    }

    onLoadChambre(): void {
        if (
            this.reservationForm.get('period').get('entree').invalid ||
            this.reservationForm.get('period').get('sortie').invalid ||
            this.reservationForm.get('residence').invalid
        ) {
            return;
        }
        this.chambres$ = this._chambreService.getAllDisponibleByResidence(
            this.reservationForm.get('residence').value,
            this.reservationForm.get('period').get('entree').value,
            this.reservationForm.get('period').get('sortie').value
        );
        this.chambres$.subscribe((res) => console.log(res));
        this.resetChambre();
    }

    resetChambre(): void {
        this.invites.controls.forEach((inviteForm: FormGroup) => {
            inviteForm.get('chambre').reset();
        });
        this.idIndispo = [];
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
                chambre: new FormControl(null, [Validators.required]),
                adresse: new FormControl(null),
                email: new FormControl(null, [Validators.email]),
            })
        );
    }

    addNewDelegation(): void {}
}
