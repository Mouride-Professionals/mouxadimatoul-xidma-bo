import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Accueillant } from '@core/model/accueillant.model';
import { Chambre } from '@core/model/chambre.model';
import { Pageable } from '@core/model/pageable.model';
import { Reservation } from '@core/model/reservation.model';
import { AccueillantService } from '@core/service/accueillant/accueillant.service';
import { ChambreService } from '@core/service/chambre/chambre.service';
import { ReservationService } from '@core/service/reservation/reservation.service';

@Component({
    selector: 'app-reservation-edit',
    templateUrl: './reservation-edit.component.html',
    styleUrls: ['./reservation-edit.component.scss'],
})
export class ReservationEditComponent implements OnInit {
    reservationForm: FormGroup = new FormGroup({
        dateEntree: new FormControl(null, [Validators.required]),
        dateSortie: new FormControl(null, [Validators.required]),
        presence: new FormControl(null, [Validators.required]),
        chambre: new FormControl(null, [Validators.required]),
        accueillant: new FormControl(null, [Validators.required]),
    });
    reservation: Reservation;
    accueillants: Accueillant[] = [];
    chambres: Chambre[] = [];

    constructor(
        private _chambreService: ChambreService,
        private _accueillantService: AccueillantService,
        private _reservationService: ReservationService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this._route.params.subscribe((params: Params) => {
            const idReservation = +params['id'];
            if (idReservation) {
                this._reservationService
                    .getReservation(idReservation)
                    .subscribe((res: Reservation) => {
                        this.reservation = res;
                        this.reservationForm.patchValue(res);
                        this.onLoadHotes();
                        this.onLoadChambre();
                    });
            }
        });
    }

    onSubmit(): void {
        if (this.reservationForm.invalid) {
            return;
        }
        this.reservation = {
            ...this.reservation,
            ...this.reservationForm.value,
        };
        this._reservationService
            .updateReservation(this.reservation)
            .subscribe(() => {
                this._snackBar.open('Réservation modifiée', 'fermer', {
                    panelClass: ['bg-amber-500', 'text-white'],
                    duration: 3000,
                });
                this._router.navigate(['/reservations']);
            });
    }

    isUnvalaible(chambre: Chambre): boolean {
        chambre.placeChoisie = chambre.placeChoisie ? chambre.placeChoisie : 0;
        return (
            chambre.nombrePlace -
                chambre.placeReservee -
                chambre.placeChoisie <=
            0
        );
    }

    onLoadChambre(): void {
        if (
            this.reservationForm.get('dateEntree').invalid ||
            this.reservationForm.get('dateSortie').invalid
        ) {
            this.chambres = [];
            return;
        }
        this._chambreService
            .getAllDisponibleByResidence(
                this.reservation?.chambre.pavillon.residence.id,
                new Date(this.reservationForm.get('dateEntree').value),
                new Date(this.reservationForm.get('dateSortie').value)
            )
            .subscribe((chambres: Chambre[]) => (this.chambres = chambres));
    }

    onLoadHotes(): void {
        this._accueillantService
            .getAll({
                page: 0,
                size: 100,
                residence: this.reservation?.chambre.pavillon.residence.id,
            })
            .subscribe(
                (res: Pageable<Accueillant>) =>
                    (this.accueillants = res.content)
            );
    }

    compareAccueillant = (a1: Accueillant, a2: Accueillant): boolean =>
        a1 === a2 || a1.id === a2.id;

    compareChambre = (c1: Chambre, c2: Chambre): boolean =>
        c1 === c2 || c1.id === c2.id;
}
